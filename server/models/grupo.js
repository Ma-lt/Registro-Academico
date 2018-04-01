var mongoose = require('mongoose');

require('./curso');
require('./estudiante');
/*
Modelo grupo/ Colección grupos
- curso: ObjectId del curso al que pertenece
- numero: numero de grupo, contador que incrementa con cada grupo nuevo de un curso
- estudiantes: Lista de ObjectId de estudiantes del grupo
- asistencia: Lista de asistencias
    - fecha: fecha en la que se toma la asistencia
    - estudiantes: lista de estudiantes con su asistencia de ese dia
        - estudiante: ObjectId de un estudiante
        - presente: Booleano dependiendo de si el estudiante está o no presente
*/

var grupoSchema = new mongoose.Schema({
  curso: {type: mongoose.Schema.Types.ObjectId,ref: 'curso'},
  numero: Number,
  estudiantes: [{type: mongoose.Schema.Types.ObjectId,ref: 'estudiante'}],
  asistencia: [
      {fecha: Date,
       estudiantes: [
            {
                    estudiante:{type: mongoose.Schema.Types.ObjectId,ref: 'estudiante'},
                    presente: Boolean
            }
           ]
          }
      ]
    });

module.exports = mongoose.model('grupo', grupoSchema, 'grupos');
