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

interface PlantTemplate {
  name: string;
  type: string;
}

@Component({
  selector: 'app-pot-monitoring',
  templateUrl: './pot-monitoring.component.html',
  styleUrls: ['./pot-monitoring.component.scss'],
  standalone: true,
  imports: [CommonModule, FooterComponent, HeaderComponent, FormsModule]
})
export class PotMonitoringComponent {
  pots = ['Pot 1', 'Pot 2'];
  selectedPot = 'Pot 2';
  
  plants: Plant[] = [
    { name: 'Concombre', type: 'Légume', quantity: 1 },
    { name: 'Piment', type: 'Épice', quantity: 1 }
  ];

  environmentalData = {
    humidity: 25,
    temperature: 25,
    dayHour: '12pm',
    nightHour: '23pm'
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

      this.plants = [...this.plants, newPlantWithId];

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
}