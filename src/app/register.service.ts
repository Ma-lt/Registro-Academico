import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Estudiante } from './models/estudiante';
import { Profesor } from './models/profesor';
import { Institucion } from './models/institucion';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable()
export class RegisterService {

    private postEstudianteURL = "api/estudiante";
    private postProfesorURL = "api/profesor";

    private getInstitucionesURL = "api/instituciones";

    constructor(private http: HttpClient) { }

    addEstudiante(estudiante: Estudiante):Observable<Estudiante>{
        return this.http.post<Estudiante>(this.postEstudianteURL, estudiante, httpOptions);
    }

    addProfesor(profesor: Profesor):Observable<Profesor>{
        return this.http.post<Profesor>(this.postProfesorURL, profesor, httpOptions);
    }

    getInstituciones(){
        return this.http.get<Institucion[]>(this.getInstitucionesURL);
    }
}
