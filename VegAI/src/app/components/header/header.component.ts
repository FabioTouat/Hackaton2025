import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  onSettings() {
    console.log('Settings clicked');
  }

  onLogout() {
    console.log('Logout clicked');
  }
} 