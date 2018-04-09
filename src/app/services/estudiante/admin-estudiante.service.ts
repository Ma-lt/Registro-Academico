import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Estudiante } from '../../models/estudiante';

//opciones que se pasan como parametro para hacer los post request
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class AdminEstudianteService {

  //declaraciones del URL para las solicitudes al servidor
  private postEstudianteURL = "api/estudiante";
  private getEstudianteURL = "api/estudiante/";
  private putEstudianteURL = "api/estudiante/";

  constructor(private http: HttpClient) { } //se inyecta el modulo http para las realizar las solicitudes al API

  //metodo para obtener un estudiante
  getEstudiante(usuario: string){
      return this.http.get<Estudiante>(this.getEstudianteURL + usuario);
  }

  //recibe como parametro un objeto de tipo estudiante, y devuelve un Observable del estudiante si este se pudo insertar a la base de datos
  addEstudiante(estudiante: Estudiante):Observable<Estudiante>{
      return this.http.post<Estudiante>(this.postEstudianteURL, estudiante, httpOptions);
  }

  //modificar un estudiante
  modifyEstudiante(estudianteId, estudiante){
    return this.http.put<Estudiante>(this.putEstudianteURL+estudianteId,
      estudiante, httpOptions);
}
}
