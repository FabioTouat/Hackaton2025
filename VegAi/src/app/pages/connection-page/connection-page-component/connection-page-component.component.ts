import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../components/header/header.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-connection-page-component',
  templateUrl: './connection-page-component.component.html',
  styleUrls: ['./connection-page-component.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    HeaderComponent,
    FooterComponent
  ]
})
export class ConnectionPageComponentComponent {
  user = {
    email: '',
    password: ''
  };

  constructor(private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Email:', this.user.email);
      console.log('Password:', this.user.password);
      
      // Pour l'instant, on redirige directement vers le dashboard
      this.router.navigate(['/dashboard']);
    }
  }
}
