import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminInstitucionComponent} from '../admin-institucion/admin-institucion.component';
import { MainEstudianteComponent } from './main-estudiante.component';
import { AdminCursoComponent } from '../admin-curso/admin-curso.component';
import { AdminEscuelaComponent } from '../admin-escuela/admin-escuela.component';
import { AdminGrupoComponent } from '../admin-grupo/admin-grupo.component';
import { AdminMateriaComponent } from '../admin-materia/admin-materia.component';
import { AdminProgramaComponent } from '../admin-programa/admin-programa.component';

const mainEstudianteRoutes: Routes = [
    { path: 'estudiante/:usr', component: MainEstudianteComponent,
      children: [
          { path: 'adminInstitucion', component: AdminInstitucionComponent },
          { path: 'adminCurso', component: AdminCursoComponent },         
          { path: 'adminEscuela', component: AdminEscuelaComponent },         
          { path: 'adminGrupo', component: AdminGrupoComponent },         
          { path: 'adminMateria', component: AdminMateriaComponent },         
          { path: 'adminPrograma', component: AdminProgramaComponent },         
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
