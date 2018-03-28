var mongoose = require('mongoose');

/*
Modelo conversacion/ Colección conversaciones
- grupo: ObjectId del grupo al que pertenecen ambos involucrados
- involucrados: ObjectId de los 2 involucrados en la conversacion
- mensajes: lista de mensajes en orden de primero a ultimo
     - emisor: ObjectId del involucrado que envía el mensajes
     - mensaje: Texto del mensaje
*/

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
