import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Materia } from '../../models/materia';

//opciones que se pasan como parametro para hacer los post request
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

//este servicio es inyectado en los componentes que lo necesitan
//las llamadas a los metodos se hacen desde estos componentes
@Injectable()
export class AdminMateriaService {

  //declaraciones del URL para las solicitudes al servidor
  private getMateriasURL = "api/materias/";
  private postMateriaURL = "api/materia";
  private deleteMateriaURL = "api/materia/";
  private putMateriaURL = "api/materia/";

    constructor(private http: HttpClient) { } //se inyecta el modulo http para las realizar las solicitudes al API

    getMaterias(institucionId){
      return this.http.get<Materia[]>(this.getMateriasURL + institucionId);
    }

    //agrega una materia a la base de datos
    addMateria(nombreMateria, institucionId){
      return this.http.post<Materia>(this.postMateriaURL,
         {"nombre": nombreMateria, "institucion": institucionId}, httpOptions);
    }

    //borrar una materia
    removeMateria(idMateria){
        return this.http.delete<Materia>(this.deleteMateriaURL+idMateria);
    }

    //modificar una materia
    modifyMateria(materiaId, materiaNombre){
      return this.http.put<Materia>(this.putMateriaURL+materiaId,
        {"_id": materiaId, "nombre": materiaNombre}, httpOptions);
  }
}
