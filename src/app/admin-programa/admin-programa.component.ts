import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Profesor } from '../models/profesor';
import { ProgramaAcademico } from '../models/programaAcademico';
import { Materia } from '../models/materia';
import { AdminProgramaAcademicoService } from '../services/programaAcademico/admin-programa-academico.service';
import { AdminProfesorService } from '../services/profesor/admin-profesor.service';
import { AdminMateriaService } from '../services/materia/admin-materia.service';

@Component({
  selector: 'app-admin-programa',
  templateUrl: './admin-programa.component.html',
  styleUrls: ['./admin-programa.component.css'],
  providers: [AdminProgramaAcademicoService, AdminProfesorService, AdminMateriaService] //en este array se deben insertar los servicios que utiliza el
})
export class AdminProgramaComponent implements OnInit {

  //variables del html
  private profesor: Profesor;
  private idInstitucion: string;
  private idEscuela: string;
  private programasAcademicos: Array<ProgramaAcademico>;
  private isavailable: boolean = false;
  private isavailableNueva: boolean = false;
  private selectedPrograma: ProgramaAcademico;
  private selectedMateriaAgregar: string;
  private materias: Array<Materia>;
  private materiasPrograma: Array<Materia>;

  constructor(private adminProgService: AdminProgramaAcademicoService,
    private adminProfService: AdminProfesorService,
    private adminMatService: AdminMateriaService,
    private route: ActivatedRoute, private router: Router) { }

    //metodo inicial
  ngOnInit() {
    let usr = this.route.snapshot.parent.paramMap.get('usr');
    this.adminProfService.getProfesor(usr).subscribe(
      data => {
        this.profesor = data
        this.setInstitucion(data.institucion);
        this.setEscuela(data.escuela);
        this.getProgramasAcademicos();
      });
  }

  //metodo para asignar la institucion
  setInstitucion(institucion){
    this.idInstitucion = institucion._id;
  }
  //metodo para asignar la escuela
  setEscuela(escuela){
    this.idEscuela = escuela._id;
  }

  //muestra la pantalla de nuevo programa
  onNuevoPrograma(){
    this.isavailable = false;
    this.isavailableNueva = true;
  }

  //crea una nuevo programa
  nuevoPrograma(programa: string){
    this.adminProgService.addProgramaAcademico(programa, this.idInstitucion, this.idEscuela)
    .subscribe(
      res => {
        //refresca los programas
        this.getProgramasAcademicos();
        //refresca la lista de materias
        this.getMaterias();
      }
    );
  }

  //refresca la lista de programas academicos que se muestra
  getProgramasAcademicos(){
      this.adminProgService.getProgramasAcademicos(this.idInstitucion, this.idEscuela)
      .subscribe(data=> {
        this.programasAcademicos = data
        console.log(data);
      }); //mapea los datos recibidos a la lista de programas

  }

  //refresca la lista de materias de la institucion
  getMaterias(){
      this.adminMatService.getMaterias(this.idInstitucion)
      .subscribe(data=> {
        this.materias = data
      }); //mapea los datos recibidos a la lista de materias

  }

  //muestra la pantalla de administar un programa
  onSelectPrograma(p){
      //refresca la lista de materias
      this.getMaterias();
      this.selectedPrograma = p;
      this.materiasPrograma = p.malla;
      console.log(p);
      console.log("materias");
      console.log(this.materiasPrograma);
      //desactiva la pantalla de nuevo programa
      this.isavailableNueva = false;
      //activa la de administrar programa
      this.isavailable = true;
  }

  //selecciona una materia
  onSelectMateriaAgregar(m){
    this.selectedMateriaAgregar = m;
  }



  //borrar un programa acdemico
  borrarPrograma(){
    this.adminProgService.removeProgramaAcademico(this.selectedPrograma._id)
    .subscribe(
      res => {
        //refresca los programas
        this.getProgramasAcademicos();
      }
    );
    //desactiva la pantalla de modificar
    this.isavailable = false;
  }

  //modifcar un programa
  modificarPrograma(programaNuevo){
    this.adminProgService.modifyProgramaAcademico(this.selectedPrograma._id, programaNuevo.nombre)
     .subscribe(
       res => {
         //refresca los programas
         this.getProgramasAcademicos();
       }
     );
  }

  agregarMateria(){
    this.adminProgService.addMateriaProgramaAcademico(this.selectedPrograma._id, this.selectedMateriaAgregar)
    .subscribe()
  }
  borrarMateria(){}
}
