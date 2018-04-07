import { Curso } from './curso'
import { Estudiante } from './estudiante'

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
