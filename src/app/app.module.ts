import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainProfesorComponent } from './main-profesor/main-profesor.component';

import { MainProfesorModule } from './main-profesor/main-profesor.module';
import { MainEstudianteModule } from './main-estudiante/main-estudiante.module';

import { AdminInstitucionComponent } from './admin-institucion/admin-institucion.component';
import { AdminEscuelaComponent } from './admin-escuela/admin-escuela.component';
import { AdminProgramaComponent } from './admin-programa/admin-programa.component';
import { AdminMateriaComponent } from './admin-materia/admin-materia.component';
import { AdminCursoComponent } from './admin-curso/admin-curso.component';
import { AdminGrupoComponent } from './admin-grupo/admin-grupo.component';
import { MainEstudianteComponent } from './main-estudiante/main-estudiante.component';
import { CursosMatriculadosComponent } from './cursos-matriculados/cursos-matriculados.component';
import { AdminEstudianteComponent } from './admin-estudiante/admin-estudiante.component';
import { MatricularCursosComponent } from './matricular-cursos/matricular-cursos.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainProfesorComponent,
    AdminInstitucionComponent,
    AdminEscuelaComponent,
    AdminProgramaComponent,
    AdminMateriaComponent,
    AdminCursoComponent,
    AdminGrupoComponent,
    MainEstudianteComponent,
    CursosMatriculadosComponent,
    AdminEstudianteComponent,
    MatricularCursosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MainEstudianteModule,
    MainProfesorModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
