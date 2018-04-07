import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AdminMateriaService } from '../services/materia/admin-materia.service';
import { AdminProfesorService } from '../services/profesor/admin-profesor.service';
import { Profesor } from '../models/profesor';
import { Materia } from '../models/materia';

@Component({
  selector: 'app-admin-materia',
  templateUrl: './admin-materia.component.html',
  styleUrls: ['./admin-materia.component.css'],
  providers: [AdminMateriaService, AdminProfesorService]
})
export class AdminMateriaComponent implements OnInit {

  private profesor: Profesor;
  private institucion: string;//id de la institucion
  private materias: Array<Materia>;
  private selectedMateria: Materia;
  private isavailable: boolean = false;
  private isavailableNueva: boolean = false;

  constructor(private adminMatService: AdminMateriaService,
    private adminProfService: AdminProfesorService,
    private route: ActivatedRoute, private router: Router) { }

    //metodo inicial
    ngOnInit() {
    	  let usr = this.route.snapshot.parent.paramMap.get('usr');
        this.adminProfService.getProfesor(usr).subscribe(
          data => {
            this.profesor = data;
            console.log(data);
            this.setInstitucion(data.institucion);
            this.getMaterias();
          })
    }

    //metodo para asignar la institucion
    setInstitucion(institucion){
      this.institucion = institucion._id;
    }

    //refresca la lista de materias que se muestra
    getMaterias(){
      this.adminMatService.getMaterias(this.institucion).subscribe( data => this.materias = data);
    }

    //muestra la pantalla de administar una Materia
    onSelectMateria(m){
        this.selectedMateria = m;
        console.log(this.selectedMateria.nombre);
        //desactiva la pantalla de nueva materia
        this.isavailableNueva = false;
        //activa la de administrar materia
        this.isavailable = true;
    }

    //muestra la pantalla de nueva materia
    onNuevaMateria(){
      this.isavailable = false;
      this.isavailableNueva = true;
    }

    //crea una nueva materia
    nuevaMateria(materia: string){
      this.adminMatService.addMateria(materia, this.institucion)
      .subscribe(
        res => {
          //refresca las materias
          this.getMaterias();
        }
      );
    }


  //borrar una materia
  borrarMateria(){
    this.adminMatService.removeMateria(this.selectedMateria._id)
    .subscribe(
      res => {
        //refresca las instituciones
        this.getMaterias();
      }
    );
    //desactiva la pantalla de modificar
    this.isavailable = false;
  }

  //modifcar una materia
  modificarMateria(materiaNueva){
    console.log(this.selectedMateria);
    this.adminMatService.modifyMateria(this.selectedMateria._id, materiaNueva.nombre)
     .subscribe(
       res => {
         //refresca las materias
         this.getMaterias();
       }
     );
  }

}
