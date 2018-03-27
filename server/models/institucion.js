const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const institucionSchema = new Schema ({
    nombre: String
});

module.exports = mongoose.model('institucion', institucionSchema, 'instituciones');
