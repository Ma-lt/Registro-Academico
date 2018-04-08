import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AdminCursoService } from '../services/curso/admin-curso.service';
import { AdminGrupoService } from '../services/grupo/admin-grupo.service';
import { AdminProfesorService } from '../services/profesor/admin-profesor.service';
import { AdminMateriaService } from '../services/materia/admin-materia.service';
import { Profesor } from '../models/profesor';
import { Grupo } from '../models/grupo';
import { Curso } from '../models/curso';
import { Materia } from '../models/materia';

@Component({
  selector: 'app-admin-grupo',
  templateUrl: './admin-grupo.component.html',
  styleUrls: ['./admin-grupo.component.css'],
  providers: [AdminGrupoService, AdminProfesorService, AdminMateriaService,AdminCursoService]
})
export class AdminGrupoComponent implements OnInit {

  constructor(private adminCurService: AdminCursoService,
    private adminGruService: AdminGrupoService,
    private adminProfService: AdminProfesorService,
    private adminMatService: AdminMateriaService,
    private route: ActivatedRoute, private router: Router) { }

    private profesor: Profesor;
    private institucion: string;//id de la institucion
    private grupos: Array<Grupo>;
    private cursos: Array<Curso>;
    private materias: Array<Materia>;
    private selectedCurso: Curso;
    private selectedMateria: Materia;
    private isavailable: boolean = false;
    private isavailableNueva: boolean = false;

    //metodo inicial
    ngOnInit() {
        let usr = this.route.snapshot.parent.paramMap.get('usr');
        this.adminProfService.getProfesor(usr).subscribe(
          data => {
            this.profesor = data;
            this.setInstitucion(data.institucion);
            this.getGrupos();
            this.getMaterias();
          })
    }

    //metodo para asignar la institucion
    setInstitucion(institucion){
      this.institucion = institucion._id;
    }

    //refresca la lista de grupos que se muestra
    getGrupos(){
      this.adminGruService.getGrupos(this.institucion).subscribe(
        data => {
        this.grupos = data
      });

    }
    //refresca la lista de materias que se muestra
    getMaterias(){
      this.adminMatService.getMaterias(this.institucion).subscribe( data => this.materias = data);
  }


    getCurso() {
      this.adminCurService.getCursosByMateria(this.selectedMateria).subscribe( data => {
          this.cursos = data;
        console.log(data);
      });
    }

    //muestra la pantalla de nuevo grupo
    onNuevoGrupo(){
      this.isavailable = false;
      this.isavailableNueva = true;
    }

    //seleccionar materia
    onSelectMateria(m){
      this.selectedMateria = m;
        this.getCurso();
    }


    onSelectCurso(c){
      this.selectedCurso = c;
    }

    //crea una nueva grupo
    nuevoGrupo(curso){
      this.adminGruService.addGrupo(curso._id)
      .subscribe(
        res => {
          //refresca los grupos
          this.getGrupos();
        }
      );
    }

}
