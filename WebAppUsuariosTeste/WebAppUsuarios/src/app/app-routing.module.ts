import { DashboardsComponent } from './Dashboards/Dashboards.component';
import { PerfisComponent } from './Perfis/Perfis.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', redirectTo:'Dashboards', pathMatch:'full'}, //Quando não colocar nada no navegador, a página padrão será Dashboards
  {path: 'Dashboards', component: DashboardsComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'Perfis', component: PerfisComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
