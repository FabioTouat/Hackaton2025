import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectionPageComponentComponent } from '../pages/connection-page/connection-page-component/connection-page-component.component';
import { VegAiDashboardComponent } from '../pages/homepage/veg-ai-dashboard.component';
import { PotMonitoringComponent } from '../pages/list-page/pot-monitoring.component';
import { PlantCardComponent } from '../pages/seeding-page/plant-card.component';
import { RegisterComponent } from '../pages/register-page/register.component';
import { SettingsComponent } from '../pages/settings/settings.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { DirtAnalyzeComponent } from '../pages/dirt-analyze/dirt-analyze.component';

const routes: Routes = [
  { path: '', redirectTo: 'connection', pathMatch: 'full' },
  { path: 'connection', component: ConnectionPageComponentComponent },
  { path: 'dashboard', component: VegAiDashboardComponent },
  { path: 'pot-monitoring', component: PotMonitoringComponent },
  { path: 'plant-card', component: PlantCardComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'dirt-analyze', component: DirtAnalyzeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
