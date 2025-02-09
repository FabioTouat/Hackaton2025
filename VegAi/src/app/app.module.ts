import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { ConnectionPageComponentComponent } from './pages/connection-page/connection-page-component/connection-page-component.component';
import { VegAiDashboardComponent } from './pages/homepage/veg-ai-dashboard.component';
import { PotMonitoringComponent } from './pages/list-page/pot-monitoring.component';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './pages/register-page/register.component';
import { ThemeService } from './services/theme.service';
import { Routes } from '@angular/router';
import { DirtAnalyzeComponent } from './pages/dirt-analyze/dirt-analyze.component';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ConnectionPageComponentComponent,
    HeaderComponent,
    PotMonitoringComponent,
    DirtAnalyzeComponent,
    VegAiDashboardComponent,
    DashboardCardComponent,
    HttpClientModule,
    RegisterComponent


  ],
  providers: [ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private themeService: ThemeService) {
    // Initialiser le thème au démarrage de l'application
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.themeService.setDarkTheme(true);
    }
  }
}
