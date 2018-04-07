import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ProgramaAcademico } from '../../models/programaAcademico';

//opciones que se pasan como parametro para hacer los post request
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

//este servicio es inyectado en los componentes que lo necesitan
//las llamadas a los metodos se hacen desde estos componentes
@Injectable()
export class AdminProgramaAcademicoService {

  //declaraciones del URL para las solicitudes al servidor
  private getProgramasAcademicosURL = "api/programas/";

  constructor(private http: HttpClient) { } //se inyecta el modulo http para las realizar las solicitudes al API

  //refresca la lista de getProgramasAcademicos que se muestra
  getProgramasAcademicos(idInstitucion: string, idEscuela: string){
      return this.http.get<ProgramaAcademico[]>(this.getProgramasAcademicosURL + idInstitucion + "/" + idEscuela); //devuelve un array de programas academicos
  }

}
