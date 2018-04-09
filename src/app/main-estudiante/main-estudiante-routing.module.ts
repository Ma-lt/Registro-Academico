import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainEstudianteComponent } from './main-estudiante.component';
import { CursosMatriculadosComponent } from '../cursos-matriculados/cursos-matriculados.component';
import { AdminEstudianteComponent } from '../admin-estudiante/admin-estudiante.component';


const mainEstudianteRoutes: Routes = [
    { path: 'estudiante/:usr', component: MainEstudianteComponent,
      children: [
          { path: 'adminEstudiante', component: AdminEstudianteComponent },
          { path: 'cursosMatriculados', component: CursosMatriculadosComponent }
      ]
    }
]

@NgModule({
  imports: [
    RouterModule.forChild(mainEstudianteRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class EstudianteRoutingModule { }
