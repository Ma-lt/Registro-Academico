var mongoose = require('mongoose');

var escuelaSchema = new mongoose.Schema({
  nombre: String,
  institucion: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Escuela', escuelaSchema, 'Escuela');
