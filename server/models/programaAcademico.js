var mongoose = require('mongoose');

require('./escuela');
/*
Modelo materia/ Colección materias
- nombre: Nombre del programa academico
- institucion: ObjectId de la institucion a la que pertenece
- malla: Lista simple de materia de un programa academico
*/

var programaAcademicoSchema = new mongoose.Schema({
  nombre: String,
  institucion: mongoose.Schema.Types.ObjectId,
  escuela: {type:mongoose.Schema.Types.ObjectId, ref: 'escuela'},
  malla: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('programaAcademico', programaAcademicoSchema, 'programasAcademicos');
