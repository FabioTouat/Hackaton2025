import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [RouterModule, CommonModule]
})
export class HeaderComponent {
  @Input() showButtons: boolean = true;
  @Input() showBackButton: boolean = false;
  @Output() onBackClick = new EventEmitter<void>();

  constructor(private router: Router) {}

  onSettings() {
    console.log('Settings clicked');
  }

  onLogout() {
    this.router.navigate(['/connection']);
  }

  onBack() {
    this.onBackClick.emit();
  }
} 