var mongoose = require('mongoose');

var materiaSchema = new mongoose.Schema({
  nombre: String,
  institucion: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('materia', materiaSchema, 'materias');
