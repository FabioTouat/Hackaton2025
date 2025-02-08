import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './modules/app-routing.module';
//import { AppComponent } from './app.component';
import { ConnectionPageComponentComponent } from './pages/connection-page/connection-page-component/connection-page-component.component';

@NgModule({
  declarations: [
  
    ConnectionPageComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
