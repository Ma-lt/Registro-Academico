var mongoose = require('mongoose');

    var grupoSchema = new mongoose.Schema({
      curso: mongoose.Schema.Types.ObjectId,
      numero: number,
      estudiantes: [mongoose.Schema.Types.ObjectId],
      asistencia: [
          {fecha: Date,
           estudiantes: [
                {
                        estudiante:mongoose.Schema.Types.ObjectId
                    }
               ]
              }
          ]
        });

module.exports = mongoose.model('grupo', grupoSchema, 'grupos');
