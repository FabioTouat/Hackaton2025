import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Plant {
  _id?: string;
  name: string;
  variety: string;
  quantity: number;
  plantingDate: string;
  harvestDate?: string;
}


interface Pot {
  _id?: string;
  name: string;
  plants: Plant[];
  autoWatering: boolean;
  size: {
    width: number;
    height: number;
  };
  sensors: {
    infrared: string;
    npr: string;
  };
}

interface PlantTemplate {
  name: string;
  type: string;
}

interface VegetableVariety {
  name: string;
  maturationDays: number;
}

interface VegetableData {
  name: string;
  varieties: VegetableVariety[];
  imageUrl: string;
}

@Component({
  selector: 'app-pot-monitoring',
  templateUrl: './pot-monitoring.component.html',
  styleUrls: ['./pot-monitoring.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    HeaderComponent,
    FormsModule,
    HttpClientModule
  ]
})
export class PotMonitoringComponent implements OnInit {
  pots: Pot[] = [];
  selectedPot: string = "";
  
  get currentPotPlants(): Plant[] {
    const pot = this.pots.find(p => p._id === this.selectedPot);
    return pot ? pot.plants : [];
  }

  get currentPot(): Pot | undefined {
    return this.pots.find(p => p.name === this.selectedPot);
  }

  environmentalData = {
    humidity: 25,
    temperature: 25,
    lightHour: '12',
    lightIntensity: '1000',
    plantHeight: '10',
    healthLevel: 'Bon',
    pestPresence: 'Aucune',
  };

  showAddPlantForm = false;
  availablePlants: PlantTemplate[] = [
  ];

  newPlant: Plant = {
    name: '',
    variety: '',
    quantity: 1,
    plantingDate: new Date().toISOString().split('T')[0]
  };

  showQRScanner = false;
  showAddPotForm = false;
  newPotCode = '';

  readonly POT_CODE_REGEX = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;

  today = new Date().toISOString().split('T')[0];  // Format YYYY-MM-DD pour l'attribut max

  vegetables: VegetableData[] = [];
  availableVarieties: VegetableVariety[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchVegetables();
    this.fetchPots();
  }

  fetchVegetables(): void {
    this.http.get<VegetableData[]>('http://localhost:5000/api/vegetables/')
      .subscribe({
        next: (data) => {
          this.vegetables = data;
          this.availablePlants = data.map(veg => ({
            name: veg.name,
            type: veg.name  // On garde le type comme le nom pour la compatibilité
          }));
        },
        error: (err) => console.error('Erreur lors du fetch des vegetables', err)
      });
  }

  fetchPots(): void {
    this.http.get<Pot[]>('http://localhost:5000/api/pots/')
      .subscribe({
        next: (data) => {
          this.pots = data;
        },
        error: (err) => console.error('Erreur lors du fetch des pots', err)
      });
  }

  onPlantInfo(plant: Plant) {
    const selectedVegetable = this.vegetables.find(v => v.name === plant.name);
    console.log(selectedVegetable?.imageUrl);
    this.router.navigate(['/plant-card'], {
      queryParams: {
        plantId: plant._id || '1',
        plantName: plant.name,
        plantVariety: plant.variety,
        plantQuantity: plant.quantity,
        plantingDate: plant.plantingDate,
        harvestDate: plant.harvestDate,
        imageUrl: selectedVegetable?.imageUrl

      }
    });
  }



  onAddPlantClick() {
    this.showAddPlantForm = true;
  }

  onSubmitPlant() {
    console.log(this.pots);
    if (this.newPlant.name && this.newPlant.variety && this.newPlant.quantity > 0) {
      const selectedVariety = this.availableVarieties.find(v => v.name === this.newPlant.variety);
         if (selectedVariety) {
            this.newPlant.harvestDate = this.calculateHarvestDate(this.newPlant.plantingDate, selectedVariety.maturationDays);
        }
      const newPlantWithId: Plant = {
        ...this.newPlant,
      };

      const potIndex = this.pots.findIndex(p => p.name === this.selectedPot);
      if (potIndex !== -1) {
        this.pots[potIndex].plants = [...this.pots[potIndex].plants, newPlantWithId];
        // Persister le pot mis à jour sur le serveur si l'identifiant est présent
        const potToUpdate = this.pots[potIndex];
        if (potToUpdate._id) {
          this.http.put(`http://localhost:5000/api/pots/${potToUpdate._id}`, potToUpdate)
            .subscribe({
              next: (response) => console.log('Pot mis à jour avec la nouvelle plante:', response),
              error: (err) => console.error('Erreur lors de la mise à jour du pot:', err)
            });
        }
      }

      this.newPlant = { name: '', variety: '', quantity: 1, plantingDate: new Date().toISOString().split('T')[0] };
      this.showAddPlantForm = false;

      
    } else {
      console.log('Veuillez remplir tous les champs correctement');
    }
  }

  onCancelAdd() {
    this.newPlant = { 
      name: '', 
      variety: '', 
      quantity: 1,
      plantingDate: new Date().toISOString().split('T')[0]
    };
    this.showAddPlantForm = false;
  }

  onPlantSelect() {
    const selectedVegetable = this.vegetables.find(v => v.name === this.newPlant.name);
    if (selectedVegetable) {
      this.availableVarieties = selectedVegetable.varieties;
      if (this.availableVarieties.length > 0) {
        this.newPlant.variety = this.availableVarieties[0].name;
      }
    }
  }

  onDeletePlant(plantToDelete: Plant) {
    const potIndex = this.pots.findIndex(p => p.name === this.selectedPot);
    if (potIndex !== -1 && plantToDelete._id) {
      this.pots[potIndex].plants = this.pots[potIndex].plants.filter(
        plant => plant._id !== plantToDelete._id
      );
      console.log('Plante supprimée:', plantToDelete.name);
    }

  }

  onPotSelect(pot: string) {
    this.selectedPot = pot;
  }

  onAddPotClick() {
    this.showAddPotForm = true;
  }

  isValidPotCode(): boolean {
    return this.POT_CODE_REGEX.test(this.newPotCode);
  }

  onSubmitPot() {
    if (this.newPotCode && this.isValidPotCode()) {
      const newPot: Pot = {
        name: `Pot ${this.pots.length + 1}`,
        plants: [],
        autoWatering: true,
        size: { width: 30, height: 40 },
        sensors: {
          infrared: 'Opérationnel',
          npr: 'Opérationnel'
        }
      };
      
      // Envoyer le nouveau pot au serveur et récupérer le pot créé avec son _id
      this.http.post<{ message: string, pot: Pot }>('http://localhost:5000/api/pots/', newPot)
        .subscribe({
          next: (response) => {
            // On ajoute le pot retourné à la liste locale
            this.pots.push(response.pot);
            // Utiliser l'_id du nouveau pot pour le sélectionner
            this.selectedPot = response.pot._id!;
            this.showAddPotForm = false;
            this.newPotCode = '';
          },
          error: (err) => {
            console.error('Erreur lors de l\'ajout du pot:', err);
          }
        });
    }
  }
  calculateHarvestDate(plantingDate: string, maturationDays: number): string {
    
    const date = new Date(plantingDate);
    date.setDate(date.getDate() + maturationDays);
    return date.toISOString().split('T')[0];
  }
  onCancelAddPot() {
    this.showAddPotForm = false;
    this.newPotCode = '';
  }

  onAnalyzeClick() {
    this.router.navigate(['/dirt-analyze']);
  }

  getPlantDisplayName(plant: Plant): string {
    return `${plant.name} x${plant.quantity}`;
  }
}