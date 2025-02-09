import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Plant {
  name: string;
  variety: string;
  id?: string;
  quantity: number;
  plantingDate: string;
  harvestDate?: string;
}

interface Pot {
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
  pots: Pot[] = [
    {
      name: 'Pot 1',
      plants: [
        { name: 'Concombre', variety: 'Légume', quantity: 1, id: '1', plantingDate: new Date().toISOString().split('T')[0] }
      ],
      autoWatering: true,
      size: { width: 30, height: 40 },
      sensors: {
        infrared: 'Opérationnel',
        npr: 'Opérationnel'
      }
    },
    {
      name: 'Pot 2',
      plants: [
        { name: 'Piment', variety: 'Épice', quantity: 1, id: '2', plantingDate: new Date().toISOString().split('T')[0] }
      ],
      autoWatering: false,
      size: { width: 25, height: 35 },
      sensors: {
        infrared: 'Opérationnel',
        npr: 'En maintenance'
      }
    }
  ];
  selectedPot = this.pots[1].name;
  
  get currentPotPlants(): Plant[] {
    const pot = this.pots.find(p => p.name === this.selectedPot);
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
    { name: 'Tomate', type: 'Légume' },
    { name: 'Concombre', type: 'Légume' },
    { name: 'Poivron', type: 'Légume' },
    { name: 'Basilic', type: 'Herbe' },
    { name: 'Menthe', type: 'Herbe' },
    { name: 'Thym', type: 'Herbe' },
    { name: 'Fraise', type: 'Fruit' },
    { name: 'Piment', type: 'Épice' },
    { name: 'Ciboulette', type: 'Herbe' }
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

  onPlantInfo(plant: Plant) {
    const selectedVegetable = this.vegetables.find(v => v.name === plant.name);
    console.log(selectedVegetable?.imageUrl);
    this.router.navigate(['/plant-card'], {
      queryParams: {
        plantId: plant.id || '1',
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
    if (this.newPlant.name && this.newPlant.variety && this.newPlant.quantity > 0) {
      const selectedVariety = this.availableVarieties.find(v => v.name === this.newPlant.variety);
         if (selectedVariety) {
            this.newPlant.harvestDate = this.calculateHarvestDate(this.newPlant.plantingDate, selectedVariety.maturationDays);
        }
      const newPlantWithId: Plant = {
        ...this.newPlant,
        id: Date.now().toString()
      };

      const potIndex = this.pots.findIndex(p => p.name === this.selectedPot);
      if (potIndex !== -1) {
        this.pots[potIndex].plants = [...this.pots[potIndex].plants, newPlantWithId];
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
    if (potIndex !== -1 && plantToDelete.id) {
      this.pots[potIndex].plants = this.pots[potIndex].plants.filter(
        plant => plant.id !== plantToDelete.id
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
      this.pots = [...this.pots, newPot];
      this.selectedPot = newPot.name;
      this.showAddPotForm = false;
      this.newPotCode = '';
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