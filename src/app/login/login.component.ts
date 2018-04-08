import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../models/estudiante';
import { Profesor } from '../models/profesor';
import { Institucion } from '../models/institucion';
import { Escuela } from '../models/escuela';
import { ProgramaAcademico } from '../models/programaAcademico';
import { AdminProfesorService } from '../services/profesor/admin-profesor.service';
import { AdminEstudianteService } from '../services/estudiante/admin-estudiante.service';
import { AdminInstitucionService } from '../services/institucion/admin-institucion.service';
import { AdminEscuelaService } from '../services/escuela/admin-escuela.service';
import { AdminProgramaAcademicoService } from '../services/programaAcademico/admin-programa-academico.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    AdminProfesorService,
    AdminEstudianteService,
    AdminInstitucionService,
    AdminEscuelaService,
    AdminProgramaAcademicoService] //en este array se deben insertar los servicios que utiliza el componente
}
)
export class LoginComponent implements OnInit {

    constructor(private router: Router,
      private adminProfService: AdminProfesorService,
      private adminEstService: AdminEstudianteService,
      private adminInsService: AdminInstitucionService,
      private adminEscService: AdminEscuelaService,
      private adminProgService: AdminProgramaAcademicoService) { } //aqui se hace la inyeccion del servicio

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
    this.adminEstService.addEstudiante(estudiante)
    .subscribe();
  }

  onSubmitRegistroProfesor(profesor: Profesor){
    /*llama el metodo addProfesor del serivicio
     * pasandole el profesor que obtiene desde
     * la interfaz*/
     console.log(profesor);
     this.adminProfService.addProfesor(profesor)
     .subscribe();
  }

  nuevaInstitucion(institucion: string){
    this.adminInsService.addInstitucion(institucion)
    .subscribe(
      res => {
        this.getInstituciones(null);
      }
    );

  }
  nuevaEscuela(institucion:string, escuela: string){
    this.adminEscService.addEscuela(escuela, institucion)
    .subscribe(
      res => {
        this.getEscuelas(institucion);
      }
    );
  }

  getInstituciones(event){
      this.adminInsService.getInstituciones().subscribe(data => this.instituciones = data); //mapea los datos recibidos a la lista de instituciones
  }

  getEscuelas(id:string){
      this.adminEscService.getEscuelas(id).subscribe(data => this.escuelas = data); //mapea los datos recibidos a la lista de escuelas
  }

    onSelectInstitucion(id: string){
      this.idInstitucion = id;
      this.getEscuelas(id);
  }

  onSelectEscuela(idEscuela: string){
      this.adminProgService.getProgramasAcademicos(idEscuela, this.idInstitucion).subscribe(data=> this.programasAcademicos = data); //mapea los datos recibidos a la lista de programas
  }

  onSubmitLogin(usuario){
      let radios = document.getElementsByName('tipo') as NodeListOf<HTMLInputElement>;

      for (var i = 0, length = radios.length; i < length; i++)
      {
       if (radios[i].checked)
       {
        // do whatever you want with the checked radio
            var tipo = radios[i].value

        // only one radio can be logically checked, don't check the rest
        break;
       }
      }

      if (tipo == "estudiante"){
          this.adminEstService.getEstudiante(usuario.usuario).subscribe(data =>{
              if(data.clave == usuario.clave){
                    this.router.navigate(['/estudiantes'+data.usuario]);
              }else{
                  alert('Usuario o contraseña invalidos')
              };
          });
      }else{
          this.adminProfService.getProfesor(usuario.usuario).subscribe(data =>{
              if(data.clave == usuario.clave){
                  this.router.navigate(['/profesor/'+data.usuario]);
              }else{
                  alert('Usuario o contraseña invalidos')
              };
          });
      }

  }
}
