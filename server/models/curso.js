var mongoose = require('mongoose');

    var cursoSchema = new mongoose.Schema({
      materia: mongoose.Schema.Types.ObjectId,
      grupos: [mongoose.Schema.Types.ObjectId],
      semestre: number,
      año: number
    });

module.exports = mongoose.model('curso', cursoSchema, 'cursos');
