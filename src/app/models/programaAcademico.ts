import { Materia } from './materia'
export class ProgramaAcademico{
    _id: string;
    nombre: string;
    institucion: string;
    escuela: string;
    malla: [Materia]
}
