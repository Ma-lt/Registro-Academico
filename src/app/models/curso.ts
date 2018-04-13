import { Materia } from './materia'
import { Grupo } from './grupo'

/*
Modelo cuso/ Colección cursos
- _id: Object id propio
- materia: ObjectId de la materia del curso
- grupos: Lista de los grupos de este curso
- semestre: semestre 1 o 2 en el que se imparte el curso
- año: año en el cual se imparte el curso
*/

export class Curso{
    _id: string;
    materia: Materia;
    grupos : [Grupo];
    semestre: number;
    anho: number;
}
