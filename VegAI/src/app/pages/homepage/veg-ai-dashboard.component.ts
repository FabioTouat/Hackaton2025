import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FormsModule } from '@angular/forms';
import { DashboardCardComponent } from '../../components/dashboard-card/dashboard-card.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-veg-ai-dashboard',
  templateUrl: './veg-ai-dashboard.component.html',
  styleUrls: ['./veg-ai-dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    HeaderComponent, 
    FormsModule,
    DashboardCardComponent,
    FooterComponent
  ]
})

export class VegAiDashboardComponent implements OnInit {
  userName: string = 'User';
  cards = [
    { title: 'Mes Pots', iconClass: 'fas fa-seedling' },
    { title: 'Profil', iconClass: 'fas fa-user' }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.userName = storedUsername;
    }
  }

  goToPotMonitoring() {
    this.router.navigate(['/pot-monitoring']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}