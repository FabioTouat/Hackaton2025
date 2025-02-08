import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { ConnectionPageComponentComponent } from './pages/connection-page/connection-page-component/connection-page-component.component';
import { VegAiDashboardComponent } from './pages/homepage/veg-ai-dashboard.component';
import { PotMonitoringComponent } from './pages/list-page/pot-monitoring.component';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    VegAiDashboardComponent,
    DashboardCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ConnectionPageComponentComponent,
    HeaderComponent,
    PotMonitoringComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
