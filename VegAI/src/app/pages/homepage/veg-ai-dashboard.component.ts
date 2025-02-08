import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-veg-ai-dashboard',
  templateUrl: './veg-ai-dashboard.component.html',
  styleUrls: ['./veg-ai-dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, FormsModule]
})

export class VegAiDashboardComponent {
  userName = 'User';

  constructor(private router: Router) {}

  goToPotMonitoring() {
    this.router.navigate(['/pot-monitoring']);
  }

  goToProfile() {
    // À implémenter quand la route du profil sera créée
    console.log('Navigation vers le profil');
  }
}