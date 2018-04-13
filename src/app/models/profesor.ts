/*
Modelo profesor/ Colección profesores
- _id: object id propio
- nombre: primer nombre del profesor
- apellidos: apellidos del profesor
- carnet: Numeros autogenerados que identifican al profesor
- institucion: ObjectId de la institucion a la que pertenece
- escuela: ObjectId de la escuela a la que pertenece
- usuario: usuario que el estudiante escogió
- clave: clave que el estudiante escogió
- grupos: grupos impartidos por el profesor
*/

export class Profesor {
    _id: string;
    nombre: string;
    apellidos: string;
    carnet: number;
    institucion: string;
    escuela: string;
    usuario: string;
    clave: string;
    grupos: [string]
}
