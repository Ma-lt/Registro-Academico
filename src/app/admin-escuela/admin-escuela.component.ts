import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AdminEscuelaService } from '../services/escuela/admin-escuela.service';
import { AdminProfesorService } from '../services/profesor/admin-profesor.service';
import { Profesor } from '../models/profesor';
import { Escuela } from '../models/escuela';

@Component({
  selector: 'app-admin-escuela',
  templateUrl: './admin-escuela.component.html',
  styleUrls: ['./admin-escuela.component.css'],
  providers: [AdminEscuelaService, AdminProfesorService]
})
export class AdminEscuelaComponent implements OnInit {

  constructor(private adminEscService: AdminEscuelaService,
    private adminProfService: AdminProfesorService,
    private route: ActivatedRoute, private router: Router) { }

  private profesor: Profesor;
  private institucion: string;//id de la institucion
  private escuelas: Array<Escuela>;
  private selectedEscuela: Escuela;
  private isavailable: boolean = false;
  private isavailableNueva: boolean = false;

  //metodo inicial
  ngOnInit() {
  	  let usr = this.route.snapshot.parent.paramMap.get('usr');
      console.log(usr);
      this.adminProfService.getProfesor(usr).subscribe(
        data => {
          this.profesor = data;
          this.setInstitucion(data.institucion);
          this.getEscuelas();
        })
  }

  //metodo para asignar la institucion
  setInstitucion(institucion){
    this.institucion = institucion._id;
  }

  //refresca la lista de escuelas que se muestra
  getEscuelas(){
    this.adminEscService.getEscuelas(this.institucion).subscribe( data => this.escuelas = data);
  }

  //muestra la pantalla de administar una escuela
  onSelectEscuela(e){
      this.selectedEscuela = e;
      //desactiva la pantalla de nueva escuela
      this.isavailableNueva = false;
      //activa la de administrar escuela
      this.isavailable = true;
  }

  //muestra la pantalla de nueva escuela
  onNuevaEscuela(){
    this.isavailable = false;
    this.isavailableNueva = true;
  }

  //crea una nueva escuela
  nuevaEscuela(escuela: string){
    this.adminEscService.addEscuela(escuela, this.institucion)
    .subscribe(
      res => {
        //refresca las escuelas
        this.getEscuelas();
      }
    );
  }


//borrar una escuela
borrarEscuela(){
  this.adminEscService.removeEscuela(this.selectedEscuela._id)
  .subscribe(
    res => {
      //refresca las instituciones
      this.getEscuelas();
    }
  );
  //desactiva la pantalla de modificar
  this.isavailable = false;
}

//modifcar una escuela
modificarEscuela(escuelaNueva){

  if (escuelaNueva.nombre == "")
    escuelaNueva.nombre = this.selectedEscuela.nombre;

  this.adminEscService.modifyEscuela(this.selectedEscuela._id, escuelaNueva.nombre)
   .subscribe(
     res => {
       //refresca las escuelas
       this.getEscuelas();
     }
   );
}
}
