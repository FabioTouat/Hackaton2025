import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-connection-page-component',
  templateUrl: './connection-page-component.component.html',
  styleUrls: ['./connection-page-component.component.scss'],
  standalone: false
})
export class ConnectionPageComponentComponent {
  constructor(private router: Router) {}

  redirectToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
