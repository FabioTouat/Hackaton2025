import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-veg-ai-dashboard',
  templateUrl: './veg-ai-dashboard.component.html',
  styleUrls: ['./veg-ai-dashboard.component.scss']
})
export class VegAiDashboardComponent {
  userName = 'User';

  constructor(private router: Router) {}

  goToPotMonitoring() {
    this.router.navigate(['/pot-monitoring']);
  }
}