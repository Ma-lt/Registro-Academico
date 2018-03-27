var mongoose = require('mongoose');

var foroSchema = new mongoose.Schema({
  grupo: mongoose.Schema.Types.ObjectId,
  posts:
  [{
      emisor: mongoose.Schema.Types.ObjectId,
      mensaje: String,
      comentarios: [
          {
              emsisor: mongoose.Schema.Types.ObjectId,
              mensaje: String
          }
      ]
      }
  ]
});

module.exports = mongoose.model('foro', foroSchema, 'foros');
