import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainProfesorComponent } from './main-profesor/main-profesor.component';
import { AdminInstitucionComponent } from './admin-institucion/admin-institucion.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainProfesorComponent,
    AdminInstitucionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
