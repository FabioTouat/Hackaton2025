import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

interface SoilMeasurement {
  label: string;
  value: number;
  unit: string;
}

@Component({
  selector: 'app-dirt-analyze',
  templateUrl: './dirt-analyze.component.html',
  styleUrls: ['./dirt-analyze.component.scss'],
  standalone: true,
  imports: [CommonModule, FooterComponent, HeaderComponent]
})
export class DirtAnalyzeComponent {
  leftColumn: SoilMeasurement[] = [
    { label: 'PH', value: 7, unit: '' },
    { label: 'Phosphate', value: 458, unit: 'ppm' },
    { label: 'Potassium', value: 52, unit: 'ppm' },
    { label: 'Calcium', value: 3358, unit: 'ppm' },
    { label: 'Magnesium', value: 172, unit: 'ppm' }
  ];

 

  statusIndicators = [
    { label: 'Faible', color: 'rouge' },
    { label: 'Moyen', color: 'jaune' },
    { label: 'Bon', color: 'vert' }
  ];
}