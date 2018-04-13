/*
Modelo estudiante/ Colección estudiantes
- _id: Object id propio
- nombre: primer nombre del estudiantes
- apellidos: apellidos del estudiante
- carnet: Numeros autogenerados que identifican al estudiante
- institucion: ObjectId de la institucion a la que pertenece
- programaAcademico: ObjectId de su programa academico
- usuario: usuario que el estudiante escogió
- clave: clave que el estudiante escogió
*/


export class Estudiante {
    _id: string;
    nombre: string;
    apellidos: string;
    carnet: number;
    institucion: string;
    escuela: string;
    programaAcademico: string;
    usuario: string;
    clave: string
}
