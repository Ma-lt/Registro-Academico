var mongoose = require('mongoose');

require('./materia');
require('./grupo');
/*
Modelo cuso/ Colección cursos
- materia: ObjectId de la materia del curso
- grupos: Lista de ObjectId de los grupos de este curso
- semestre: semestre 1 o 2 en el que se imparte el curso
- año: año en el cual se imparte el curso
*/

    var cursoSchema = new mongoose.Schema({
      materia: {type: mongoose.Schema.Types.ObjectId,ref: 'materia'},
      grupos: [{type: mongoose.Schema.Types.ObjectId,ref: 'grupo'}],
      semestre: Number,
      anho: Number
    });

module.exports = mongoose.model('curso', cursoSchema, 'cursos');
