const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('./institucion');
require('./programaAcademico');
require('./escuela');
/*
Modelo estudiante/ Colección estudiantes
- nombre: primer nombre del estudiantes
- apellidos: apellidos del estudiante
- carnet: Numeros autogenerados que identifican al estudiante
- institucion: ObjectId de la institucion a la que pertenece
- programaAcademico: ObjectId de su programa academico
- usuario: usuario que el estudiante escogió
- clave: clave que el estudiante escogió
*/

const estudianteSchema = new Schema({
    nombre: String,
    apellidos: String,
    carnet: Number,
    institucion: {type: mongoose.Schema.Types.ObjectId, ref: 'institucion'},
    escuela: {type:mongoose.Schema.Types.ObjectId, ref: 'escuela'},
    programaAcademico: {type: mongoose.Schema.Types.ObjectId, ref: 'programaAcademico'},
    usuario: String,
    clave: String,
});

module.exports = mongoose.model('estudiante',estudianteSchema ,'estudiantes');
