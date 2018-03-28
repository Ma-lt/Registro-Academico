var mongoose = require('mongoose');

/*
Modelo foro/ Colección foros
- grupo: ObjectId del grupo al que pertenece
- posts: Lista de posts
    - emisor: ObjectId del estudiante o profesor que crea el posts
    - mensaje: texo del post
    - fecha: fecha en la cual fue creada el post
    - comentarios: Lista de comentarios de un post
        - emisor: ObjectId del estudiante o profsor que escribe el comentarios
        - mensaje: texto del comentario
*/

var foroSchema = new mongoose.Schema({
  grupo: mongoose.Schema.Types.ObjectId,
  posts:
  [{
      emisor: mongoose.Schema.Types.ObjectId,
      mensaje: String,
      fecha: Date,
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
