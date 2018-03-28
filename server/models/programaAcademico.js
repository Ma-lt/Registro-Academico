var mongoose = require('mongoose');

/*
Modelo materia/ Colección materias
- nombre: Nombre del programa academico
- institucion: ObjectId de la institucion a la que pertenece
- malla: Lista simple de materia de un programa academico
*/

var programaAcademicoSchema = new mongoose.Schema({
  nombre: String,
  institucion: mongoose.Schema.Types.ObjectId,
  malla: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('programaAcademico', programaAcademicoSchema, 'programasAcademicos');
