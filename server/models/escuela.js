var mongoose = require('mongoose');

/*
Modelo escuela/ Colección escuelas
- nombre: nombre de la escuela
- institucion: ObjectId de la institucion a la que pertenece
*/

var escuelaSchema = new mongoose.Schema({
  nombre: String,
  institucion: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('escuela', escuelaSchema, 'escuelas');
