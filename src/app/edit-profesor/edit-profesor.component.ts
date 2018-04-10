import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Profesor } from '../models/profesor';
import { Institucion } from '../models/institucion';
import { Escuela } from '../models/escuela';
import { AdminInstitucionService } from '../services/institucion/admin-institucion.service';
import { AdminEscuelaService } from '../services/escuela/admin-escuela.service';
import { AdminProfesorService } from '../services/profesor/admin-profesor.service';

@Component({
  selector: 'app-edit-profesor',
  templateUrl: './edit-profesor.component.html',
  styleUrls: ['./edit-profesor.component.css'],
  providers: [AdminProfesorService,
    AdminInstitucionService,
    AdminEscuelaService,]
})
export class EditProfesorComponent implements OnInit {

	private profesor: Profesor;
	private instituciones: Array<Institucion>;
    private escuelas: Array<Escuela>;
    private idInstitucion: string;
	private idEscuela: string;


  constructor(private adminProfService: AdminProfesorService,
    private adminInsService: AdminInstitucionService,
    private adminEscService: AdminEscuelaService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  	    let usr = this.route.snapshot.parent.paramMap.get('usr');
    this.adminProfService.getProfesor(usr).subscribe(
      data => {
        this.profesor = data;
        this.getInstituciones(null)
      });
  }

    onSubmitModificarProfesor(profesor: Profesor){
    if(profesor.nombre == "")
      profesor.nombre = this.profesor.nombre;
    if(profesor.apellidos == "")
      profesor.apellidos = this.profesor.apellidos;
    if(profesor.usuario == "")
      profesor.usuario = this.profesor.usuario;
    if(profesor.clave == "")
      profesor.clave = this.profesor.clave;
    if(profesor.institucion == "")
      profesor.institucion = this.profesor.institucion;
    if(profesor.escuela == "")
      profesor.escuela = this.profesor.escuela;
    /*if(profesor.grupos == [])
      profesor.grupos = this.profesor.grupos;*/

    console.log(profesor);
    this.adminProfService.modifyProfesor(this.profesor._id, profesor)
    .subscribe()
  }

  getInstituciones(event){
      this.adminInsService.getInstituciones().subscribe(data => this.instituciones = data); //mapea los datos recibidos a la lista de instituciones
  }

  getEscuelas(id:string){
      this.adminEscService.getEscuelas(id).subscribe(data => this.escuelas = data); //mapea los datos recibidos a la lista de escuelas
  }

  onSelectInstitucion(id: string){
      this.idInstitucion = id;
      this.getEscuelas(id);
  }

  onSelectEscuela(id: string){
  	this.idEscuela = id;
  }


}

/*

const profesorSchema = new Schema({
    nombre: String,
    apellidos: String,
    carnet: Number,
    institucion: {type: mongoose.Schema.Types.ObjectId, ref: 'institucion'},
    escuela: {type:mongoose.Schema.Types.ObjectId, ref: 'escuela'},
    usuario: String,
    clave: String,
    grupos: [{type: mongoose.Schema.Types.ObjectId, ref:'grupo'}]
});

*/