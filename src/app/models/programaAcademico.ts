import { Materia } from './materia'

/*
Modelo materia/ Colección materias
-_id: Object id propio
- nombre: Nombre del programa academico
- institucion: ObjectId de la institucion a la que pertenece
- malla: Lista simple de materia de un programa academico
*/

export class ProgramaAcademico{
    _id: string;
    nombre: string;
    institucion: string;
    escuela: string;
    malla: [Materia]
}
