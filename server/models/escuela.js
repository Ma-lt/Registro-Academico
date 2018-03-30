var mongoose = require('mongoose');

require('./institucion');
/*
Modelo escuela/ Colección escuelas
- nombre: nombre de la escuela
- institucion: ObjectId de la institucion a la que pertenece
*/

var escuelaSchema = new mongoose.Schema({
  nombre: String,
  institucion: {type: mongoose.Schema.Types.ObjectId,ref: 'institucion'}
});

module.exports = mongoose.model('escuela', escuelaSchema, 'escuelas');
