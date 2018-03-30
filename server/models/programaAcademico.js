var mongoose = require('mongoose');

require('./escuela');
require('./institucion');
require('./materia');
/*
Modelo materia/ Colección materias
- nombre: Nombre del programa academico
- institucion: ObjectId de la institucion a la que pertenece
- malla: Lista simple de materia de un programa academico
*/

var programaAcademicoSchema = new mongoose.Schema({
  nombre: String,
  institucion: {type: mongoose.Schema.Types.ObjectId,ref: 'institucion'},
  escuela: {type:mongoose.Schema.Types.ObjectId, ref: 'escuela'},
  malla: [{type: mongoose.Schema.Types.ObjectId, ref: 'materia'}]
});

module.exports = mongoose.model('programaAcademico', programaAcademicoSchema, 'programasAcademicos');
