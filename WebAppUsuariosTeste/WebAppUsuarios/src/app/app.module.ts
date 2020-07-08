import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { DashboardsComponent } from './Dashboards/Dashboards.component';
import { PerfisComponent } from './Perfis/Perfis.component';
import { NavComponent } from './Nav/Nav.component';
import { TitulosComponent } from './Titulos/Titulos.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
   declarations: [
      AppComponent,
      UsuariosComponent,
      DashboardsComponent,
      PerfisComponent,
      NavComponent,
      TitulosComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      BsDropdownModule.forRoot(),
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      ModalModule.forRoot(),
      HttpClientModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
