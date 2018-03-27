const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const estudianteSchema = new Schema({
    nombre: String,
    apellidos: String,
    carmet: Number,
    institucion: mongoose.Schema.Types.ObjectId,
    programaAcademico: mongoose.Schema.Types.ObjectId,
    usuario: mongoose.Schema.Types.ObjectId,
    password: String,
});

module.exports = mongoose.model('estudiante',estudianteSchema ,'estudiantes');
