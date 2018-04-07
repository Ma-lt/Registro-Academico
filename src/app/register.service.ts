import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Estudiante } from './models/estudiante';
import { Profesor } from './models/profesor';
import { Institucion } from './models/institucion';
import { Escuela } from './models/escuela';
import { ProgramaAcademico } from './models/programaAcademico';

//opciones que se pasan como parametro para hacer los post request
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

//este servicio es inyectado en los componentes que lo necesitan
//las llamadas a los metodos se hacen desde estos componentes
@Injectable()
export class RegisterService {

    //declaraciones del URL para las solicitudes al servidor
    private postEstudianteURL = "api/estudiante";
    private postProfesorURL = "api/profesor";
    private getInstitucionesURL = "api/instituciones";
    private getEscuelasURL = "api/escuelas/";
    private getProgramasAcademicosURL = "api/programas/";
    private postInstitucionURL = "api/institucion";
    private postEscuelaURL = "api/escuela";

    constructor(private http: HttpClient) { } //se inyecta el modulo http para las realizar las solicitudes al API

    //recibe como parametro un objeto de tipo estudiante, y devuelve un Observable del estudiante si este se pudo insertar a la base de datos
    addEstudiante(estudiante: Estudiante):Observable<Estudiante>{
        return this.http.post<Estudiante>(this.postEstudianteURL, estudiante, httpOptions);
    }

    //recibe como parametro un objeto de tipo profesor, y devuelve un Observable del profesor si este se pudo insertar a la base de datos
    addProfesor(profesor: Profesor):Observable<Profesor>{
        return this.http.post<Profesor>(this.postProfesorURL, profesor, httpOptions);
    }

    getInstituciones(){
        return this.http.get<Institucion[]>(this.getInstitucionesURL); //devuelve un array de instituciones
    }

    //recibe como parametro el id de la institucion
    getEscuelas(id: string){
        return this.http.get<Escuela[]>(this.getEscuelasURL + id); //devuelve un array de escuelas
    }


    addInstitucion(nombreInstitucion){
      return this.http.post<Institucion>(this.postInstitucionURL, {"nombre": nombreInstitucion}, httpOptions);
    }

    addEscuela(idInstitucion, nombreEscuela){
      return this.http.post<Escuela>(this.postEscuelaURL, {"institucion":idInstitucion, "nombre": nombreEscuela}, httpOptions);
    }
}
