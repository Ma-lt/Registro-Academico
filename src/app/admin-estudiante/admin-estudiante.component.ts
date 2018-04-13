import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AdminEstudianteService } from '../services/estudiante/admin-estudiante.service';
import { AdminInstitucionService } from '../services/institucion/admin-institucion.service';
import { AdminEscuelaService } from '../services/escuela/admin-escuela.service';
import { AdminProgramaAcademicoService } from '../services/programaAcademico/admin-programa-academico.service';
import { Institucion } from '../models/institucion';
import { Escuela } from '../models/escuela';
import { ProgramaAcademico } from '../models/programaAcademico';
import { Estudiante } from '../models/estudiante';

@Component({
  selector: 'app-admin-estudiante',
  templateUrl: './admin-estudiante.component.html',
  styleUrls: ['./admin-estudiante.component.css'],
  providers: [
    AdminEstudianteService,
    AdminInstitucionService,
    AdminEscuelaService,
    AdminProgramaAcademicoService] //en este array se deben insertar los servicios que utiliza el componente
})
export class AdminEstudianteComponent implements OnInit {
  //constructor inicializa todos los servicios
  constructor(private router: Router, private route: ActivatedRoute,
    private adminEstService: AdminEstudianteService,
    private adminInsService: AdminInstitucionService,
    private adminEscService: AdminEscuelaService,
    private adminProgService: AdminProgramaAcademicoService) { } //aqui se hace la inyeccion del servicio

    //declaraciones de las variables que se usan desde la interfaz HTML para desplegar las opciones del select
    private instituciones: Array<Institucion>;
    private escuelas: Array<Escuela>;
    private programasAcademicos: Array<ProgramaAcademico>;
    private idInstitucion: string;
    private estudiante: Estudiante;

    //metodo inicial
  ngOnInit() {
    let usr = this.route.snapshot.parent.paramMap.get('usr');
    this.adminEstService.getEstudiante(usr).subscribe(
      data => {
        this.estudiante = data;
        this.getInstituciones(null);
      })
  }

  //cuando se modifica un estudiante
  onSubmitModificarEstudiante(estudiante: Estudiante){
    if(estudiante.nombre == "")
      estudiante.nombre = this.estudiante.nombre;
    if(estudiante.apellidos == "")
      estudiante.apellidos = this.estudiante.apellidos;
    if(estudiante.usuario == "")
      estudiante.usuario = this.estudiante.usuario;
    if(estudiante.clave == "")
      estudiante.clave = this.estudiante.clave;
    if(estudiante.institucion == "")
      estudiante.institucion = this.estudiante.institucion;
    if(estudiante.escuela == "")
      estudiante.escuela = this.estudiante.escuela;
    if(estudiante.programaAcademico == "")
      estudiante.programaAcademico = this.estudiante.programaAcademico;

    console.log(estudiante);
    this.adminEstService.modifyEstudiante(this.estudiante._id, estudiante)
    .subscribe()
  }

//refesca la lista de instituciones
  getInstituciones(event){
      this.adminInsService.getInstituciones().subscribe(data => this.instituciones = data); //mapea los datos recibidos a la lista de instituciones
  }

//refresca la lista de escuelas
  getEscuelas(id:string){
      this.adminEscService.getEscuelas(id).subscribe(data => this.escuelas = data); //mapea los datos recibidos a la lista de escuelas
  }

//cuando selecciona una institucion
  onSelectInstitucion(id: string){
      this.idInstitucion = id;
      this.getEscuelas(id);
  }
//cuando selecciona una escuela
  onSelectEscuela(idEscuela: string){
      this.adminProgService.getProgramasAcademicos(this.idInstitucion, idEscuela).subscribe(data=> {
        this.programasAcademicos = data
      }); //mapea los datos recibidos a la lista de programas
  }

}
