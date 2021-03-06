import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Curso } from '../../models/curso';

//opciones que se pasan como parametro para hacer los post request
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

//este servicio es inyectado en los componentes que lo necesitan
//las llamadas a los metodos se hacen desde estos componentes
@Injectable()
export class AdminCursoService {

  //declaraciones del URL para las solicitudes al servidor
  private getCursosURL = "api/cursos/";
  private getCursoURL = "api/curso/";
  private getCursosMateriaURL = "api/cursosM/"
  private postCursoURL = "api/curso";
  private deleteCursoURL = "api/curso/";
  private putCursoURL = "api/curso/";
  private putCursoBURL = "api/cursoB/";

  constructor(private http: HttpClient) { } //se inyecta el modulo http para las realizar las solicitudes al API

  //recupera todas las escuelas de la institucion
  getCursos(institucionId){
    return this.http.get<Curso[]>(this.getCursosURL + institucionId);
  }

  //recupera un curso
  getCurso(cursoId){
    console.log("get curso en service");
    return this.http.get<Curso>(this.getCursoURL + cursoId);
  }

  //agrega un curso a la base de datos
  addCurso(curso, materiaId){
    return this.http.post<Curso>(this.postCursoURL,
      {"semestre": curso.semestre, "anho": curso.anho, "materia": materiaId}, httpOptions);
  }

  //eliminar un curso
  removeCurso(idCurso){
    return this.http.delete<Curso>(this.deleteCursoURL+idCurso);
  }

  //modificar un curso
  modifyCurso(cursoId, curso){
    return this.http.put<Curso>(this.putCursoURL+cursoId,
      curso, httpOptions);
  }

  //agregar un grupo al curso
  agregarGrupo(cursoId, grupoId){
      return this.http.put<Curso>(this.putCursoURL + cursoId + '/' + grupoId, httpOptions);
  }

  //eliminar un grupo del curso
  eliminarGrupo(cursoId, grupoId){
      console.log(cursoId);
      console.log(grupoId);
      return this.http.put<Curso>(this.putCursoBURL + cursoId + '/' + grupoId, httpOptions);
  }
  //dependiendo de una materia muestra los diferentes cursos
  getCursosByMateria(materiaId)  {
    return this.http.get<Curso[]>(this.getCursosMateriaURL + materiaId);
  }

}
