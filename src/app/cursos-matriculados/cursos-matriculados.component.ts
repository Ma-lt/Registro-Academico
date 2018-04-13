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
    private institucion: string;

  ngOnInit() {
      let usr = this.route.snapshot.parent.paramMap.get('usr');
      this.adminEstService.getEstudiante(usr).subscribe(
        data => {
            this.estudiante = data;
            this.setInstitucion(data.institucion);
            console.log(data);
            })
  }

  setInstitucion(institucion){
      this.institucion = institucion._id;
  }

}
