const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profesorSchema = new Schema({
    nombre: String,
    apellidos: String,
    carmet: Number,
    institucion: mongoose.Schema.Types.ObjectId,
    escuela: mongoose.Schema.Types.ObjectId,
    usuario: mongoose.Schema.Types.ObjectId,
    password: String,
    grupos: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('profesor',profesorSchema,'profesores');
