import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Profesor } from './models/profesor';
import { Institucion } from './models/institucion';

//opciones que se pasan como parametro para hacer los post request
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

//este servicio es inyectado en los componentes que lo necesitan
//las llamadas a los metodos se hacen desde estos componentes
@Injectable()
export class AdminInstitucionService{

    //declaraciones del URL para las solicitudes al servidor
    private getProfesorURL = "api/profesor/";
    private getInstitucionesURL = "api/instituciones";
    private postInstitucionURL = "api/institucion";
    private deleteInstitucionURL = "api/institucion/";
    private putInstitucionURL = "api/institucion/";

    //recupera el profesor que ingresó
    constructor(private http: HttpClient) { } //se inyecta el modulo http para las realizar las solicitudes al API
    getProfesor(usuario: string){
        return this.http.get<Profesor>(this.getProfesorURL + usuario);
    }

    //refresca la lista de instituciones que se muestra
    getInstituciones(){
        return this.http.get<Institucion[]>(this.getInstitucionesURL);
    }

    //agrega una institucion a la base de datos
    addInstitucion(nombreInstitucion){
      return this.http.post<Institucion>(this.postInstitucionURL, {"nombre": nombreInstitucion}, httpOptions);
    }

    //borra una institucion de la base de datos
    removeInstitucion(idInstitucion){
      return this.http.delete<Institucion>(this.deleteInstitucionURL+idInstitucion);
    }

    //modificar una institucion
    modifyInstitucion(institucionId, institucionNombre){
      return this.http.put<Institucion>(this.putInstitucionURL+institucionId,
        {"_id": institucionId, "nombre": institucionNombre}, httpOptions);
  }
}
