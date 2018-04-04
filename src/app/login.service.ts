import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Estudiante } from './models/estudiante';
import { Profesor } from './models/profesor';

//opciones que se pasan como parametro para hacer los post request
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

//este servicio es inyectado en los componentes que lo necesitan
//las llamadas a los metodos se hacen desde estos componentes
@Injectable()
export class LoginService {

    //declaraciones del URL para las solicitudes al servidor
    private getEstudianteURL = "api/estudiante/";
    private getProfesorURL = "api/profesor/";

    constructor(private http: HttpClient) { } //se inyecta el modulo http para las realizar las solicitudes al API
    getEstudiante(usuario: string){
        return this.http.get<Estudiante>(this.getEstudianteURL + usuario);
    }

    getProfesor(usuario: string){
        return this.http.get<Profesor>(this.getProfesorURL + usuario);
    }
}
