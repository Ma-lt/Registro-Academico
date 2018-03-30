import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../models/estudiante';
import { Profesor } from '../models/profesor';
import { Institucion } from '../models/institucion';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [RegisterService]
}
)
export class LoginComponent implements OnInit {

  constructor(private registerService: RegisterService) { }

    private instituciones: Array<Institucion>;

  ngOnInit() {
  }
  onSubmitRegistroEstudiante(estudiante: Estudiante){
    console.log(estudiante);
    this.registerService.addEstudiante(estudiante)
    .subscribe();
  }

  onSubmitRegistroProfesor(profesor: Profesor){
     console.log(profesor);
     this.registerService.addProfesor(profesor)
     .subscribe();
  }

  getInstituciones(event){
      this.registerService.getInstituciones().subscribe(data => this.instituciones = data);
      console.log(this.instituciones);
  }
}
