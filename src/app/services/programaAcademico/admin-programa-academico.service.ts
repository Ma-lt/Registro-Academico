import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ProgramaAcademico } from '../../models/programaAcademico';
import { Profesor } from '../../models/profesor';

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
  private postProgramaAcademicoURL = "api/programa";
  private putProgramaAcademicoURL = "api/programa/";
  private deleteProgramaAcademicoURL = "api/programa/";
  private putInsertarMateriaProgramaURL = "api/programa-agM/";
  private putEliminarMateriaProgramaURL = "api/programa-elM/";

  constructor(private http: HttpClient) { } //se inyecta el modulo http para las realizar las solicitudes al API

  //refresca la lista de getProgramasAcademicos que se muestra
  getProgramasAcademicos(idInstitucion: string, idEscuela: string){
      return this.http.get<ProgramaAcademico[]>(this.getProgramasAcademicosURL + idInstitucion + "/" + idEscuela); //devuelve un array de programas academicos
  }

  //agrega un programa academico
  addProgramaAcademico(programa : string, institucion : string, escuela : string){
    return this.http.post<ProgramaAcademico>(this.postProgramaAcademicoURL,
      {"nombre":programa, "institucion": institucion, "escuela":escuela}, httpOptions);
  }

  //borra un programa academico de la base de datos
  removeProgramaAcademico(idPrograma){
    return this.http.delete<ProgramaAcademico>(this.deleteProgramaAcademicoURL+idPrograma);
  }

  //modificar una institucion
  modifyProgramaAcademico(programaId, programaNombre){
    return this.http.put<ProgramaAcademico>(this.putProgramaAcademicoURL+programaId,
      {"nombre": programaNombre}, httpOptions);
  }

  //agregar una materia a la malla
  addMateriaProgramaAcademico(programaId, materiaId){
    return this.http.put<ProgramaAcademico>(this.putInsertarMateriaProgramaURL+programaId,
    {"materia": materiaId}, httpOptions);
  }
  //borrar una materia de la malla
  removeMateriaProgramaAcademico(programaId, materiaId){
    return this.http.put<ProgramaAcademico>(this.putEliminarMateriaProgramaURL+programaId,
    {"materia": materiaId}, httpOptions);
  }
}
