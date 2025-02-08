import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-connection-page-component',
  templateUrl: './connection-page-component.component.html',
  styleUrls: ['./connection-page-component.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class ConnectionPageComponentComponent {
  user = {
    email: '',
    password: ''
  };

  error = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  onSubmit() {
    this.http.post('http://localhost:5000/api/auth/login', this.user)
      .subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.error = error.error.message || 'Email ou mot de passe incorrect';
        }
      });
  }
}
