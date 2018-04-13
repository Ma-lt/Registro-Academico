import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AdminEstudianteService } from '../services/estudiante/admin-estudiante.service';
import { AdminInstitucionService } from '../services/institucion/admin-institucion.service';
import { AdminCursoService } from '../services/curso/admin-curso.service';
import { AdminEscuelaService } from '../services/escuela/admin-escuela.service';
import { AdminProgramaAcademicoService } from '../services/programaAcademico/admin-programa-academico.service';
import { AdminGrupoService } from '../services/grupo/admin-grupo.service';
import { Institucion } from '../models/institucion';
import { Escuela } from '../models/escuela';
import { ProgramaAcademico } from '../models/programaAcademico';
import { Estudiante } from '../models/estudiante';
import { Curso } from '../models/curso';
import { Grupo } from '../models/grupo';

@Component({
  selector: 'app-matricular-cursos',
  templateUrl: './matricular-cursos.component.html',
  styleUrls: ['./matricular-cursos.component.css'],
  providers: [
    AdminEstudianteService,
    AdminInstitucionService,
    AdminEscuelaService,
    AdminProgramaAcademicoService,
    AdminGrupoService,
    AdminCursoService] //en este array se deben insertar los servicios que utiliza el componente
})
export class MatricularCursosComponent implements OnInit {
//constructor inicializa los servicios
  constructor(private router: Router, private route: ActivatedRoute,
    private adminCurService: AdminCursoService,
    private adminEstService: AdminEstudianteService,
    private adminInsService: AdminInstitucionService,
    private adminEscService: AdminEscuelaService,
    private adminGrupService: AdminGrupoService,
    private adminProgService: AdminProgramaAcademicoService) { } //aqui se hace la inyeccion del servicio
//variables necesarias del html
    private estudiante: Estudiante;
    private cursos: Array<Curso>;
    private grupos: Array<Grupo>;
    private institucion: string;//id de la institucion
    private selectedCurso: Curso;

    //metodo inicial
    ngOnInit() {
        let usr = this.route.snapshot.parent.paramMap.get('usr');
        this.adminEstService.getEstudiante(usr).subscribe(
          data => {
            this.estudiante = data;
            this.setInstitucion(data.institucion);
            this.getCursos();
          })
      }

    //metodo para asignar la institucion
    setInstitucion(institucion){
      this.institucion = institucion._id;
    }

    //refresca la lista de cursos que se muestra
    getCursos(){
      this.adminCurService.getCursos(this.institucion).subscribe( data => {
        this.cursos = data;
      });
    }

    //muestra los grupos de un curso
    onSelectCurso(c){
        this.selectedCurso = c;
        console.log(this.selectedCurso)
        this.adminCurService.getCurso(c).subscribe( data => {
          console.log(data);
          this.grupos = data.grupos;
        });

    }
    //matricula a un estudiante en un grupo
    matricularGrupo(datos){
      this.adminGrupService.matricularEstudiante(datos.grupo, this.estudiante._id)
      .subscribe();
  }
}
