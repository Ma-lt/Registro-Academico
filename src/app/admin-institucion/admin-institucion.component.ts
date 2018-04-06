import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AdminInstitucionService } from '../admin-institucion.service';
import { Profesor } from '../models/profesor';
import { Institucion } from '../models/institucion';

@Component({
  selector: 'app-admin-institucion',
  templateUrl: './admin-institucion.component.html',
  styleUrls: ['./admin-institucion.component.css'],
  providers: [AdminInstitucionService]
})
export class AdminInstitucionComponent implements OnInit {

  constructor(private adminService: AdminInstitucionService,
    private route: ActivatedRoute, private router: Router) { }

  //variables del html
  private profesor: Profesor;
  private instituciones: Array<Institucion>;
  private isavailable: boolean = false;
  private isavailableNueva: boolean = false;
  private selectedInstitucion: Institucion;
  //metodo que se llama al inicio
  ngOnInit() {
      let usr = this.route.snapshot.parent.paramMap.get('usr');
      this.adminService.getProfesor(usr).subscribe( data => this.profesor = data );
      this.getInstituciones();
  }

  //refresca la lista de instituciones que se muestra
  getInstituciones(){
    this.adminService.getInstituciones().subscribe( data => this.instituciones = data);
  }

  //muestra la pantalla de nueva institucion
  onNuevaInstitucion(){
    this.isavailable = false;
    this.isavailableNueva = true;
  }

  //muestra la pantalla de administar una institucion
  onSelectInstitucion(i){
      console.log(i);
      this.selectedInstitucion = i;
      if(this.selectedInstitucion != null){
        console.log("no es nula obvio")
        console.log(this.selectedInstitucion.nombre);
        //desactiva la pantalla de nueva institucion
        this.isavailableNueva = false;
        //activa la de administrar institucion
        console.log("se enciende");
        this.isavailable = true;
      }
  }

  //crea una nueva institucion
  nuevaInstitucion(institucion: string){
    this.adminService.addInstitucion(institucion)
    .subscribe(
      res => {
        //refresca las instituciones
        this.getInstituciones();
      }
    );
  }

  //borrar una institucion
  borrarInstitucion(){
    this.adminService.removeInstitucion(this.selectedInstitucion._id)
    .subscribe(
      res => {
        //refresca las instituciones
        this.getInstituciones();
      }
    );
    //desactiva la pantalla de modificar
    this.isavailable = false;
  }

  //modifcar una institucion
  modificarInstitucion(institucionNueva){
    console.log(this.selectedInstitucion);
    this.adminService.modifyInstitucion(this.selectedInstitucion._id, institucionNueva.nombre)
     .subscribe(
       res => {
         //refresca las instituciones
         this.getInstituciones();
       }
     );
  }
}
