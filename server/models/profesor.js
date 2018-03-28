const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('./institucion');
require('./escuela');
require('./grupo');
/*
Modelo profesor/ Colección profesores
- nombre: primer nombre del profesor
- apellidos: apellidos del profesor
- carnet: Numeros autogenerados que identifican al profesor
- institucion: ObjectId de la institucion a la que pertenece
- escuela: ObjectId de la escuela a la que pertenece
- usuario: usuario que el estudiante escogió
- clave: clave que el estudiante escogió
- grupos: grupos impartidos por el profesor
*/

const profesorSchema = new Schema({
    nombre: String,
    apellidos: String,
    carnet: Number,
    institucion: {type: mongoose.Schema.Types.ObjectId, ref: 'institucion'},
    escuela: {type:mongoose.Schema.Types.ObjectId, ref: 'escuela'},
    usuario: String,
    clave: String,
    grupos: [{type: mongoose.Schema.Types.ObjectId, ref:'grupo'}]
});

module.exports = mongoose.model('profesor',profesorSchema,'profesores');
