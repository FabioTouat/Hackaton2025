import { Component } from "@angular/core";

interface NutritionValue {
  value: number;
  label: string;
}
@Component({
  selector: 'dirt-analyze-panel',
  templateUrl: './dirt-analyze.component.html',
  styleUrls: ['./dirt-analyze.component.scss']
})
export class DirtAnalyzeComponent {
  topValues: NutritionValue[] = [
    { value: 5, label: 'Potassium' },
    { value: 458, label: 'Phosphate' },
    { value: 7, label: 'PH' }
  ];

  middleLabels: string[] = ['more fruit', 'magnesium', 'calcium'];

  bottomValues: NutritionValue[] = [
    { value: 72, label: 'ppm' },
    { value: 335, label: 'ppm' }
  ];
} 