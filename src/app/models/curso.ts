import { Materia } from './materia'
import { Grupo } from './grupo'

export class Curso{
    _id: string;
    materia: Materia;
    grupos : [Grupo];
    semestre: number;
    anho: number;
}
