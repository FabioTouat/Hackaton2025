import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Plant {
  name: string;
  type: string;
  id?: string;
  quantity: number;
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

@Component({
  selector: 'app-pot-monitoring',
  templateUrl: './pot-monitoring.component.html',
  styleUrls: ['./pot-monitoring.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    HeaderComponent,
    FormsModule
  ]
})
export class PotMonitoringComponent {
  pots: Pot[] = [
    {
      name: 'Pot 1',
      plants: [
        { name: 'Concombre', type: 'Légume', quantity: 1, id: '1' }
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
        { name: 'Piment', type: 'Épice', quantity: 1, id: '2' }
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
    type: '',
    quantity: 1
  };

  showQRScanner = false;
  showAddPotForm = false;
  newPotCode = '';

  readonly POT_CODE_REGEX = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;

  constructor(private router: Router) {}

  onPlantInfo(plant: Plant) {
    this.router.navigate(['/plant-card'], {
      queryParams: {
        plantId: plant.id || '1',
        plantName: plant.name,
        plantType: plant.type,
        plantQuantity: plant.quantity
      }
    });
  }

  onAddPlantClick() {
    this.showAddPlantForm = true;
  }

  onSubmitPlant() {
    if (this.newPlant.name && this.newPlant.type && this.newPlant.quantity > 0) {
      const newPlantWithId: Plant = {
        ...this.newPlant,
        id: Date.now().toString()
      };

      const potIndex = this.pots.findIndex(p => p.name === this.selectedPot);
      if (potIndex !== -1) {
        this.pots[potIndex].plants = [...this.pots[potIndex].plants, newPlantWithId];
      }

      this.newPlant = { name: '', type: '', quantity: 1 };
      this.showAddPlantForm = false;

      console.log('Plante ajoutée avec succès !');
    } else {
      console.log('Veuillez remplir tous les champs correctement');
    }
  }

  onCancelAdd() {
    this.newPlant = { name: '', type: '', quantity: 1 };
    this.showAddPlantForm = false;
  }

  onPlantSelect() {
    const selectedPlant = this.availablePlants.find(p => p.name === this.newPlant.name);
    if (selectedPlant) {
      this.newPlant.type = selectedPlant.type;
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

  onCancelAddPot() {
    this.showAddPotForm = false;
    this.newPotCode = '';
  }

  onAnalyzeClick() {
    this.router.navigate(['/dirt-analyze']);
  }
}