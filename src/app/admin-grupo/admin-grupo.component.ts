import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AdminCursoService } from '../services/curso/admin-curso.service';
import { AdminGrupoService } from '../services/grupo/admin-grupo.service';
import { AdminProfesorService } from '../services/profesor/admin-profesor.service';
import { Profesor } from '../models/profesor';
import { Grupo } from '../models/grupo';
import { Curso } from '../models/curso';

@Component({
  selector: 'app-admin-grupo',
  templateUrl: './admin-grupo.component.html',
  styleUrls: ['./admin-grupo.component.css'],
  providers: [AdminGrupoService, AdminProfesorService, AdminCursoService]
})
export class AdminGrupoComponent implements OnInit {

  constructor(private adminCurService: AdminCursoService,
    private adminGruService: AdminGrupoService,
    private adminProfService: AdminProfesorService,
    private route: ActivatedRoute, private router: Router) { }

    private profesor: Profesor;
    private institucion: string;//id de la institucion
    private grupos: Array<Grupo>;
    private cursos: Array<Curso>;
    private selectedCurso: string;
    private selectedGrupo: Grupo;
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
          })
    }

    //metodo para asignar la institucion
    setInstitucion(institucion){
      this.institucion = institucion._id;
    }

    getCursos(){
      this.adminCurService.getCursos(this.institucion).subscribe( data => {
          this.cursos = data;
          this.getGrupos();

        });
    }
    //refresca la lista de grupos que se muestra
    getGrupos(){
        if(this.selectedCurso != null){

            for(let curso of this.cursos){
                if(curso._id == this.selectedCurso){
                    this.grupos = curso.grupos;
                }
            }
        }
        
    }

    onSelectCurso(c){
      this.selectedCurso = c;
      this.getGrupos();
    }

        //crea una nueva grupo
    nuevoGrupo(){
      this.adminGruService.addGrupo(this.selectedCurso)
      .subscribe(
        res => {
      //refresca los grupos
        this.adminCurService.agregarGrupo(this.selectedCurso, res._id)
                .subscribe(response => {
                this.getCursos();
                });
        });
    }

    onSelectGrupo(g){
        this.selectedGrupo = g;
        this.isavailable = true;
    }

    borrarGrupo(){
        this.adminGruService.deleteGrupo(this.selectedGrupo._id)
            .subscribe(
                res => {
                    console.log(res);
                    this.adminCurService.eliminarGrupo(this.selectedCurso, this.selectedGrupo._id)
                        .subscribe(response =>{
                            this.getCursos();
                        });
                });
    }

}
