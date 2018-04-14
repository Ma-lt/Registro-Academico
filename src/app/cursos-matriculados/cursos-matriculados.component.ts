import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AdminCursoService } from '../services/curso/admin-curso.service';
import { AdminGrupoService } from '../services/grupo/admin-grupo.service';
import { AdminEstudianteService } from '../services/estudiante/admin-estudiante.service';
import { Estudiante } from '../models/estudiante';
import { Grupo } from '../models/grupo';
import { Curso } from '../models/curso';

@Component({
  selector: 'app-cursos-matriculados',
  templateUrl: './cursos-matriculados.component.html',
  styleUrls: ['./cursos-matriculados.component.css'],
  providers: [AdminGrupoService, AdminEstudianteService, AdminCursoService]
})
export class CursosMatriculadosComponent implements OnInit {

  constructor(private adminCurService: AdminCursoService,
    private adminGruService: AdminGrupoService,
    private adminEstService: AdminEstudianteService,
    private route: ActivatedRoute, private router: Router) { }

    private estudiante: Estudiante;
    private estudianteId: string;
    private institucion: string;
    private cursos: Array<Curso>;
    private cursosMatriculados: Array<Curso> = [];

  ngOnInit() {
      let usr = this.route.snapshot.parent.paramMap.get('usr');
      this.adminEstService.getEstudiante(usr).subscribe(
        data => {
            this.estudiante = data;
            this.estudianteId = data._id;
            this.setInstitucion(data.institucion);
            this.getCursos();
            })
  }

  setInstitucion(institucion){
      this.institucion = institucion._id;
  }

    getCursos(){
      this.adminCurService.getCursos(this.institucion).subscribe( data => {
          this.cursos = data;
          //  console.log(data);
              this.getGrupos();
      });
    }

    getGrupos(){
        for(let curso of this.cursos){
            for(let grupo of curso.grupos){
                for(let estudiante of grupo.estudiantes){
                    var json = JSON.stringify(estudiante);
                    json = json.replace(/['"]+/g, '');
                    if(json == this.estudianteId){
                        this.cursosMatriculados.push(curso);
                        }
                    }
                }

            }
        }
            


}
