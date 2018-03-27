var mongoose = require('mongoose');

var conversacionSchema = new mongoose.Schema({
  grupo: mongoose.Schema.Types.ObjectId,
  involucrados: [mongoose.Schema.Types.ObjectId],
  mensajes:
  [{
      emisor: mongoose.Schema.Types.ObjectId,
      mensaje: String
      }
  ]
});

module.exports = mongoose.model('conversacion', conversacionSchema, 'conversaciones');
