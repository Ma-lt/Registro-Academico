import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AdminEscuelaService } from '../admin-escuela.service';
import { Profesor } from '../models/profesor';
import { Escuela } from '../models/escuela';

@Component({
  selector: 'app-admin-escuela',
  templateUrl: './admin-escuela.component.html',
  styleUrls: ['./admin-escuela.component.css'],
  providers: [AdminEscuelaService]
})
export class AdminEscuelaComponent implements OnInit {

  constructor(private adminService: AdminEscuelaService,
    private route: ActivatedRoute, private router: Router) { }

  private profesor: Profesor;
  private institucion: string;//id de la institucion
  private escuelas: Array<Escuela>;
  private selectedEscuela: Escuela;
  private isavailable: boolean = false;
  private isavailableNueva: boolean = false;

  ngOnInit() {
  	  let usr = this.route.snapshot.parent.paramMap.get('usr');
      this.adminService.getProfesor(usr).subscribe(
        data => {
          this.profesor = data;
          console.log(data);
          this.setInstitucion(data.institucion);
          this.getEscuelas();
        })
  }

setInstitucion(institucion){
  this.institucion = institucion._id;
}

  //refresca la lista de escuelas que se muestra
  getEscuelas(){
    this.adminService.getEscuelas(this.institucion).subscribe( data => this.escuelas = data);
  }

  //muestra la pantalla de administar una escuela
  onSelectEscuela(e){
      console.log(e);
      this.selectedEscuela = e;
      console.log(this.selectedEscuela.nombre);
      //desactiva la pantalla de nueva escuela
      this.isavailableNueva = false;
      //activa la de administrar escuela
      console.log("se enciende");
      this.isavailable = true;
  }

  //muestra la pantalla de nueva escuela
  onNuevaEscuela(){
    this.isavailable = false;
    this.isavailableNueva = true;
  }

  //crea una nueva escuela
  nuevaEscuela(escuela: string){
    this.adminService.addEscuela(escuela, this.institucion)
    .subscribe(
      res => {
        //refresca las escuelas
        this.getEscuelas();
      }
    );
  }


//borrar una escuela
borrarEscuela(){
  this.adminService.removeEscuela(this.selectedEscuela._id)
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
  console.log(this.selectedEscuela);
  this.adminService.modifyEscuela(this.selectedEscuela._id, escuelaNueva.nombre)
   .subscribe(
     res => {
       //refresca las instituciones
       this.getEscuelas();
     }
   );
}
}
