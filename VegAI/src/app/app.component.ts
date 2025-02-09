import { Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  standalone: false
})
export class AppComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    // Le thème sera initialisé au démarrage de l'application
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.themeService.setDarkTheme(true);
    }
  }
} 