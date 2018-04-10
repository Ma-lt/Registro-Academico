import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainEstudianteComponent } from './main-estudiante.component';
import { CursosMatriculadosComponent } from '../cursos-matriculados/cursos-matriculados.component';
import { AdminEstudianteComponent } from '../admin-estudiante/admin-estudiante.component';
import { MatricularCursosComponent } from '../matricular-cursos/matricular-cursos.component';

const mainEstudianteRoutes: Routes = [
    { path: 'estudiante/:usr', component: MainEstudianteComponent,
      children: [
          { path: 'adminEstudiante', component: AdminEstudianteComponent },
          { path: 'cursosMatriculados', component: CursosMatriculadosComponent },
          { path: 'matricularCursos', component: MatricularCursosComponent }
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
