import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectionPageComponentComponent } from '../pages/connection-page/connection-page-component/connection-page-component.component';

const routes: Routes = [
{path: '', redirectTo: '/connection', pathMatch: 'full'},
{path: 'connection', component: ConnectionPageComponentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
