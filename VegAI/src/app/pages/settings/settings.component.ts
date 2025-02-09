import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent]
})
export class SettingsComponent implements OnInit {
  isDarkMode = false;
  passwordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  error = '';
  success = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    // Appliquer le thème au chargement
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark';
    this.applyTheme();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme() {
    if (this.isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  changePassword() {
    if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
      this.error = 'Les mots de passe ne correspondent pas';
      return;
    }

    const headers = new HttpHeaders().set(
      'Authorization', `Bearer ${localStorage.getItem('token')}`
    );

    this.http.post('http://localhost:5000/api/auth/change-password', {
      currentPassword: this.passwordData.currentPassword,
      newPassword: this.passwordData.newPassword
    }, { headers }).subscribe({
      next: () => {
        this.success = 'Mot de passe modifié avec succès';
        this.passwordData = {
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        };
        this.error = '';
      },
      error: (error) => {
        this.error = error.error.message || 'Une erreur est survenue';
        this.success = '';
      }
    });
  }
} 