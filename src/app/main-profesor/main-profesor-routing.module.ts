import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminInstucionComponent} from '../admin-institucion/admin-institucion.component';

const mainProfesorRoutes: Routes = [

    { path: 'profesores', component: Profesores,
      children: [
          { path: 'adminInstitucion', component: AdminInstucionComponent }
      ]

@NgModule({
  imports: [
    RouterModule.forChild(mainProfesorRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProfesorRoutingModule { }
