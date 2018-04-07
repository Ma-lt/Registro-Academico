import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Profesor } from '../../models/profesor';

//opciones que se pasan como parametro para hacer los post request
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class AdminProfesorService {

  //declaraciones del URL para las solicitudes al servidor
  private postProfesorURL = "api/profesor";
  private getProfesorURL = "api/profesor/";

  constructor(private http: HttpClient) { } //se inyecta el modulo http para las realizar las solicitudes al API

  //metodo para obtener un profesor
  getProfesor(usuario: string){
      return this.http.get<Profesor>(this.getProfesorURL + usuario);
  }

  //recibe como parametro un objeto de tipo profesor, y devuelve un Observable del profesor si este se pudo insertar a la base de datos
  addProfesor(profesor: Profesor):Observable<Profesor>{
      return this.http.post<Profesor>(this.postProfesorURL, profesor, httpOptions);
  }

}
