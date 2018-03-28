var mongoose = require('mongoose');

/*
Modelo materia/ Colección materias
- nombre: Nombre de la materia
- institucion: ObjectId de la institucion a la que pertenece
*/

var materiaSchema = new mongoose.Schema({
  nombre: String,
  institucion: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('materia', materiaSchema, 'materias');
