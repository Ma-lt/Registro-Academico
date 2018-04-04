import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../models/estudiante';
import { Profesor } from '../models/profesor';
import { Institucion } from '../models/institucion';
import { Escuela } from '../models/escuela';
import { ProgramaAcademico } from '../models/programaAcademico';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [RegisterService] //en este array se deben insertar los servicios que utiliza el componente
}
)
export class LoginComponent implements OnInit {

    constructor(private registerService: RegisterService) { } //aqui se hace la inyeccion del servicio

  //declaraciones de las variables que se usan desde la interfaz HTML para desplegar las opciones del select
  private instituciones: Array<Institucion>;
  private escuelas: Array<Escuela>;
  private programasAcademicos: Array<ProgramaAcademico>;

  private idInstitucion: string;

  ngOnInit() {
  }

  //todas estas funciones se llaman desde la parte HTML del componente  
  //el subscribe es completamente necesario
  
  onSubmitRegistroEstudiante(estudiante: Estudiante){
    /*llama el metodo addEstudiante del serivicio
     * pasandole el estudiante que obtiene desde
     * la interfaz*/
    this.registerService.addEstudiante(estudiante)
    .subscribe();
  }

  onSubmitRegistroProfesor(profesor: Profesor){
    /*llama el metodo addProfesor del serivicio
     * pasandole el profesor que obtiene desde
     * la interfaz*/
     console.log(profesor);
     this.registerService.addProfesor(profesor)
     .subscribe();
  }

  getInstituciones(event){
      this.registerService.getInstituciones().subscribe(data => this.instituciones = data); //mapea los datos recibidos a la lista de instituciones
  }

    onSelectInstitucion(id: string){
      this.idInstitucion = id;
      this.registerService.getEscuelas(id).subscribe(data => this.escuelas = data); //mapea los datos recibidos a la lista de escuelas
  }

  onSelectEscuela(idEscuela: string){
      this.registerService.getProgramasAcademicos(idEscuela, this.idInstitucion).subscribe(data=> this.programasAcademicos = data); //mapea los datos recibidos a la lista de programas
  }

  onSubmitLogin(usuario){
      console.log(usuario.tipo);
      //if usuario.tipo = estudiante
      //    loginEstudiante(usuario.usuario, usuario.contraseña)
      //    /api/estudiante/:usr/:contraseña
  }
}
