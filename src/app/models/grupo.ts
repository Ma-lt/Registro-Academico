import { Curso } from './curso'
import { Estudiante } from './estudiante'

/*
Modelo grupo/ Colección grupos
- curso: ObjectId del curso al que pertenece
- numero: numero de grupo, contador que incrementa con cada grupo nuevo de un curso
- estudiantes: Lista de ObjectId de estudiantes del grupo
- asistencia: Lista de asistencias

Modelo asistencia
- fecha: fecha en la que se toma la asistencia
- estudiantes: lista de estudiantes con su asistencia de ese dia

Modelo EstAsistencia
- estudiante: ObjectId de un estudiante
- presente: Booleano dependiendo de si el estudiante está o no presente
*/

export class Grupo{
    _id: string;
    curso : Curso;
    numero : number;
    estudiantes : [Estudiante];
    asistencia : [Asistencia];
}

class Asistencia{
  fecha : Date;
  estudiantes : [EstAsistencia];
}

class EstAsistencia{
  estudiante : Estudiante;
  presente : boolean;
}
