import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MatTooltipModule } from '@angular/material/tooltip';


interface SoilMeasurement {
  label: string;
  value: number;
  unit: string;
  bottomValue: number;
  topValue: number;
  type?: 'ph' | 'normal';
  tooltip?: string;
}

@Component({
  selector: 'app-dirt-analyze',
  templateUrl: './dirt-analyze.component.html',
  styleUrls: ['./dirt-analyze.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FooterComponent, 
    HeaderComponent, 
  ]
})
export class DirtAnalyzeComponent {
  leftColumn: SoilMeasurement[] = [

    { 
      label: 'PH',
      value: 6.9,
      unit: '',
      bottomValue: 6,
      topValue: 8,
      type: 'ph',
      tooltip: 'Un pH neutre (7) est idéal. En dessous, le sol est acide, au-dessus il est basique.'
    },
    { 
      label: 'Phosphore',
      value: 458,
      unit: 'ppm',
      bottomValue: 200,
      topValue: 350,
      tooltip: 'Pour augmenter : ajouter du compost, du fumier ou des engrais phosphatés.'
    },
    { 
      label: 'Potassium',
      value: 52,
      unit: 'ppm',
      bottomValue: 60,
      topValue: 120,
      tooltip: 'Pour augmenter : ajouter des cendres de bois, du compost ou des algues marines.'
    },
    { 
      label: 'Calcium',
      value: 2534,
      unit: 'ppm',
      bottomValue: 1500,
      topValue: 2700,
      tooltip: 'Pour augmenter : ajouter de la chaux ou des coquilles d\'œufs broyées.'
    },
    { 
      label: 'Magnesium',
      value: 172,
      unit: 'ppm',
      bottomValue: 50,
      topValue: 150,
      tooltip: 'Pour augmenter : ajouter du sel d\'Epsom ou de la dolomie.'
    }
  ];

  statusIndicators = [
    { label: 'Faible', color: 'rouge' },
    { label: 'Moyen', color: 'jaune' },
    { label: 'Bon', color: 'vert' }
  ];

  getValueColor(measurement: SoilMeasurement): string {
    if (measurement.type === 'ph') {
      if (measurement.value >= 6.8 && measurement.value <= 7.2) {
        return '#4CAF50'; // vert - neutre
      } else if (measurement.value > 7) {
        return measurement.value > 8 ? '#f44336' : '#ffc107'; // rouge si > 8, jaune sinon
      } else {
        return measurement.value < 6 ? '#f44336' : '#ffc107'; // rouge si < 6, jaune sinon
      }
    }
    if (measurement.value > measurement.topValue) {
      return '#4CAF50';
    } else if (measurement.value < measurement.bottomValue) {
      return '#f44336';
    } else {
    
        return '#ffc107';
      
    }
  }

  getPhLabel(value: number): string {
    if (value === 7) return 'Neutre';
    if (value > 7) return 'Basique';
    return 'Acide';
  }
}