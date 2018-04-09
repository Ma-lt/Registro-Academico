import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Grupo } from '../../models/grupo';

//opciones que se pasan como parametro para hacer los post request
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

//este servicio es inyectado en los componentes que lo necesitan
//las llamadas a los metodos se hacen desde estos componentes
@Injectable()
export class AdminGrupoService {

  //declaraciones del URL para las solicitudes al servidor
  private getGruposURL = "api/grupos/";
  private postGrupoURL = "api/grupo";
  private deleteGrupoURL = "api/grupo/";

  constructor(private http: HttpClient) { } //se inyecta el modulo http para las realizar las solicitudes al API

  //recupera todas las escuelas de la institucion
  getGrupos(cursoId){
    return this.http.get<Grupo[]>(this.getGruposURL + cursoId);
  }

  //agrega un grupo a la base de datos
  addGrupo(cursoId){
    return this.http.post<Grupo>(this.postGrupoURL,
      {"curso" : cursoId}, httpOptions);
  }

  deleteGrupo(grupoId){
      console.log("elimnarGrupo");
      return this.http.delete<Grupo>(this.deleteGrupoURL+grupoId);
  }

}
