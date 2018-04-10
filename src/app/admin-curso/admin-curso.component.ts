import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AdminCursoService } from '../services/curso/admin-curso.service';
import { AdminProfesorService } from '../services/profesor/admin-profesor.service';
import { AdminMateriaService } from '../services/materia/admin-materia.service';
import { Profesor } from '../models/profesor';
import { Curso } from '../models/curso';
import { Materia } from '../models/materia';

@Component({
  selector: 'app-admin-curso',
  templateUrl: './admin-curso.component.html',
  styleUrls: ['./admin-curso.component.css'],
  providers: [AdminCursoService, AdminProfesorService, AdminMateriaService]
})
export class AdminCursoComponent implements OnInit {

  constructor(private adminCurService: AdminCursoService,
    private adminProfService: AdminProfesorService,
    private adminMatService: AdminMateriaService,
    private route: ActivatedRoute, private router: Router) { }

    private profesor: Profesor;
    private institucion: string;//id de la institucion
    private cursos: Array<Curso>;
    private materias: Array<Materia>;
    private selectedCurso: Curso;
    private selectedMateria: Materia;
    private selectedAnhoStr: string;
    private selectedSemestreStr: string;
    private isavailable: boolean = false;
    private isavailableNueva: boolean = false;


    //metodo inicial
    ngOnInit() {
    	  let usr = this.route.snapshot.parent.paramMap.get('usr');
        this.adminProfService.getProfesor(usr).subscribe(
          data => {
            this.profesor = data;
            this.setInstitucion(data.institucion);
            this.getCursos();
            this.getMaterias();
          })
    }

    //metodo para asignar la institucion
    setInstitucion(institucion){
      this.institucion = institucion._id;
    }

    //refresca la lista de cursos que se muestra
    getCursos(){
      this.adminCurService.getCursos(this.institucion).subscribe( data => {
        this.cursos = data});

    }

    //refresca la lista de materias que se muestra
    getMaterias(){
      this.adminMatService.getMaterias(this.institucion).subscribe( data => this.materias = data);
  }

    //muestra la pantalla de nuevo curso
    onNuevoCurso(){
      this.isavailable = false;
      this.isavailableNueva = true;
    }

    //muestra la pantalla de administar un curso
    onSelectCurso(c){
        this.selectedCurso = c;
        this.selectedAnhoStr = c.anho as string;
        this.selectedSemestreStr = c.semestre as string;
        //desactiva la pantalla de nuevo curso
        this.isavailableNueva = false;
        //activa la de administrar curso
        this.isavailable = true;
    }

    //seleccionar el semestre
    onSelectSemestre(s){
      this.selectedSemestreStr = s;
    }

    //seleccionar el anho
    onSelectanho(a){
      this.selectedAnhoStr = a;
    }

    //seleccionar materia
    onSelectMateria(m){
      this.selectedMateria = m;
    }

    //crea una nueva curso
    nuevoCurso(curso){
      this.adminCurService.addCurso(curso, this.selectedMateria)
      .subscribe(
        res => {
          //refresca los cursos
          this.getCursos();
        }
      );
    }

    //borrar un curso
    borrarCurso(){
      this.adminCurService.removeCurso(this.selectedCurso._id)
      .subscribe(
        res => {
          //refresca los cursos
          this.getCursos();
        }
      );
      //desactiva la pantalla de modificar
      this.isavailable = false;
    }

    //modificar un curso
    modificarCurso(curso){

      if (curso.materia == "")
        curso.materia = this.materias;
      if (curso.anho == "")
        curso.anho = this.selectedAnhoStr;
      if (curso.semestre == "")
        curso.semestre = this.selectedSemestreStr;
      
      this.adminCurService.modifyCurso(this.selectedCurso._id, curso)
      .subscribe(
        res =>{
          //refresca los cursos
          this.getCursos();
        }
      )
    }
}
