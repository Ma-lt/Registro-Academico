var mongoose = require('mongoose');

require('./institucion');
/*
Modelo materia/ Colección materias
- nombre: Nombre de la materia
- institucion: ObjectId de la institucion a la que pertenece
*/

var materiaSchema = new mongoose.Schema({
  nombre: String,
  institucion: {type: mongoose.Schema.Types.ObjectId,ref: 'institucion'}
});

module.exports = mongoose.model('materia', materiaSchema, 'materias');
