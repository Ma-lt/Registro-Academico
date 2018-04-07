import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Profesor } from '../../models/profesor';
import { Escuela } from '../../models/escuela';
import {} from 'jasmine';
//opciones que se pasan como parametro para hacer los post request
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

//este servicio es inyectado en los componentes que lo necesitan
//las llamadas a los metodos se hacen desde estos componentes
@Injectable()
export class AdminEscuelaService{

    //declaraciones del URL para las solicitudes al servidor
    private getEscuelasURL = "api/escuelas/";
    private postEscuelaURL = "api/escuela";
    private deleteEscuelaURL = "api/escuela/";
    private putEscuelaURL = "api/escuela/";

    constructor(private http: HttpClient) { } //se inyecta el modulo http para las realizar las solicitudes al API
    getEscuelas(institucionId){
      return this.http.get<Escuela[]>(this.getEscuelasURL + institucionId);
    }

    //agrega una escuela a la base de datos
    addEscuela(nombreEscuela, institucionId){
      return this.http.post<Escuela>(this.postEscuelaURL,
         {"nombre": nombreEscuela, "institucion": institucionId}, httpOptions);
    }

    //borrar una escuela
    removeEscuela(idEscuela){
        return this.http.delete<Escuela>(this.deleteEscuelaURL+idEscuela);
    }

    //modificar una institucion
    modifyEscuela(escuelaId, escuelaNombre){
      return this.http.put<Escuela>(this.putEscuelaURL+escuelaId,
        {"_id": escuelaId, "nombre": escuelaNombre}, httpOptions);
  }
}
