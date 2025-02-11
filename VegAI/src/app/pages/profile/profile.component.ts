import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router } from '@angular/router';

interface UserProfile {
  username: string;
  email: string;
  stats: {
    plantsHarvested: number;
    co2Saved: number;
    moneySaved: number;
  };
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent]
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfile = {
    username: '',
    email: '',
    stats: {
      plantsHarvested: 0,
      co2Saved: 0,
      moneySaved: 0
    }
  };
  error: string = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/connection']);
      return;
    }

    const headers = new HttpHeaders().set(
      'Authorization', `Bearer ${token}`
    );

    this.http.get('http://localhost:5000/api/auth/profile', { headers })
      .subscribe({
        next: (response: any) => {
          this.userProfile = response;
        },
        error: (error) => {
          console.error('Erreur lors de la récupération du profil:', error);
          this.error = error.error.message || 'Erreur lors de la récupération du profil';
          if (error.status === 401) {
            this.router.navigate(['/connection']);
          }
        }
      });
  }
} 