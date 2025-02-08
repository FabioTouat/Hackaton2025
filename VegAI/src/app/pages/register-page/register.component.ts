import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent]
})
export class RegisterComponent {
  user = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  error = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  onSubmit() {
    if (this.user.password !== this.user.confirmPassword) {
      this.error = 'Les mots de passe ne correspondent pas';
      return;
    }

    this.http.post('http://localhost:5000/api/auth/register', {
      username: this.user.username,
      email: this.user.email,
      password: this.user.password
    }).subscribe({
      next: (response: any) => {
        // Stocke le token dans le localStorage
        localStorage.setItem('token', response.token);
        // Redirige vers le dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.error = error.error.message || 'Une erreur est survenue';
      }
    });
  }
} 