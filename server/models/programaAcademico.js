var mongoose = require('mongoose');

    var programaAcademicoSchema = new mongoose.Schema({
      nombre: String,
      institucion: mongoose.Schema.Types.ObjectId,
      malla: [mongoose.Schema.Types.ObjectId]
    });

module.exports = mongoose.model('programaAcademico', programaAcademicoSchema, 'programasAcademicos');
