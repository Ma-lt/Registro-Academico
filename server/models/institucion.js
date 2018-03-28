const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
Modelo institucion/ Colección instituciones
- nombre: Nombre de la institucion
*/

const institucionSchema = new Schema ({
    nombre: String
});

module.exports = mongoose.model('institucion', institucionSchema, 'instituciones');
