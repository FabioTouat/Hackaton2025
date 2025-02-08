import { Component } from '@angular/core';

interface Plant {
  name: string;
  type: string;
}

@Component({
  selector: 'app-pot-monitoring',
  templateUrl: './pot-monitoring.component.html',
  styleUrls: ['./pot-monitoring.component.scss']
})
export class PotMonitoringComponent {
  pots = ['Pot 1', 'Pot 2'];
  selectedPot = 'Pot 2';
  
  plants: Plant[] = [
    { name: 'Concombre', type: 'Légume' },
    { name: 'Piment', type: 'Épice' }
  ];

  environmentalData = {
    humidity: 80.1,
    temperature: 25,
    dayHour: '12pm',
    nightHour: '23pm'
  };
}