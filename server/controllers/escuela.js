var mongoose = require('mongoose');

//modelos necesarios
var escuela = mongoose.model('escuela');

//metodo para enviar respuesta
var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

//metodo para buscar el ObjectId de una escuela
//Institucion es un ObjectId
function getEscuelaID(Nombre, Institucion) {
  //busca la escuela por el nombre y la institucion
  var query = escuela.findOne({
    'nombre': Nombre,
    'institucion' : Institucion
  }, function(err, programaRes) {
    if (err){
      return handleError(err);
    }
  })

  return query;
}

//metodo para buscar todas las escuelas de una institucion
module.exports.buscarTodasEscuelas = function(req,res){
  if(req.params && req.params.institucion){
    escuela
      .find({
        "institucion": req.params.institucion
      })
      .exec(function(err, escuelas){
  				if(!escuelas){
  					sendJsonResponse(res, 404,{"message": "Escuelas no encontradas"});
  					return
  				} else if (err){
  					sendJsonResponse(res,404, err);
  					return;
  				}
  				sendJsonResponse(res, 200,escuelas);
  			});
    }else{
      sendJsonResponse(res, 404,{"message": "No hay institucion en la solicitud"});
    }
}

//metodo para buscar una escuela por id
module.exports.buscarUnaEscuelaId = function(req, res){
  if(req.params && req.params.id){
    //tiene parametos y id
    //busca una escuela con ese id
    escuela
      .findById(req.params.id)
			.populate('institucion')
      .exec(function(err, escuelaRes){
        if(!escuelaRes){//si no existe, no lo encontró
          sendJsonResponse(res, 404,{"message": "Escuela no encontrada"});
					return
        }else if (err){//si ocurre un error, envia el error
					sendJsonResponse(res,404, err);
					return;
				}
        //encontró la escuela y la envía en la respuesta
				sendJsonResponse(res, 200,escuelaRes);
      })
  }else{
    sendJsonResponse(res, 404,{"message": "No hay id en la solicitud"});
  }
}

//metodo para insertar una escuela
//recibe el objectId de institucion
module.exports.insertarUnaEscuela = function(req, res) {
  console.log('Insertar Escuela');

  //crea una instancia del modelo estudiante
  var newEscuela = new escuela();

  //le asigna nombre sin ningun cambio
  newEscuela.nombre = req.body.nombre;
  newEscuela.institucion = req.body.institucion;
  newEscuela.save(function(err, escuela){
    if (err) {
      console.log('Error insertando escuela \n' + err);
    }else{
      //retorna el estudiante salvado
      sendJsonResponse(res, 200, escuela);
      console.log("salva en la base de datos");
    }
  })
}

//metodo para insertar una escuela si no existe
module.exports.insertarUnaEscuelaSiNoExiste = function(req, res) {
  console.log('Insertar Escuela si no existe');

	//se fija si la escuela existe

	//crea un query para recuperar el ObjectId
  var query = getEscuelaID(req.body.nombre);

	//ejecuta el query
  query.exec(function(err, escuelaRes) {
		if (err){
      console.log(err);
      return;
    }
		if(escuelaRes != null){
			sendJsonResponse(res, 200, {"message": "Escuela ya existe"});
			return
		}
	})
	//la institucion no existe, entonces la inserta

  //crea una instancia del modelo institucion
  var newEscuela = new escuela();

	//le asigna nombre sin ningun cambio
  newEscuela.nombre = req.body.nombre;
  newEscuela.institucion = req.body.institucion;

  newEscuela.save(function(err, escuela){
    if (err) {
      console.log('Error insertando escuela \n' + err);
    }else{
      //retorna la escuela salvada
      sendJsonResponse(res, 200, escuela);
      console.log("salva en la base de datos");
    }
  })
}

//metodo para borrar una escuela con ObjectId
module.exports.eliminarUnaEscuelaId = function(req, res){
  if(req.params && req.params.id){
    //tiene parametos y id
    //busca una escuela con ese id
    escuela
      .remove({"_id": req.params.id})
      .exec(function(err, escuelaRes){
        if(!escuelaRes){//si no existe, no lo encontró
          sendJsonResponse(res, 404,{"message": "Escuela no encontrada"});
					return
        }else if (err){//si ocurre un error, envia el error
					sendJsonResponse(res,404, err);
					return;
				}
        sendJsonResponse(res, 200,{"message": "Escuela eliminada"});
      })
  }
}

//metodo para modificar una escuela con ObjectId
module.exports.modificarUnaEscuelaId = function(req, res){
  if(req.params && req.params.id){
    //tiene parametos y id
    //busca una escuela con ese id
    escuela
      .findById(req.params.id)
      .exec(function(err, escuelaRes){
        if(!escuelaRes){//si no existe, no lo encontró
					sendJsonResponse(res, 404,{"message": "Escuela no encontrada"});
					return
				}else if (err){//si ocurre un error, envia el error
					sendJsonResponse(res,404, err);
					return;
				}

        //realiza las modificaciones
				//asigna nombre sin ningun cambio
				escuelaRes.nombre = req.body.nombre;
        escuelaRes.save(function(err, escuela){
          if(err){
            console.log('Error modificando escuela \n' + err);
          }else{
            //retorna el escuela salvada
            sendJsonResponse(res, 200, escuela);
            console.log("salva en la base de datos");
          }
        })
      })
  }else{
    //no se envió un id
    sendJsonResponse(res, 404,{"message": "No hay id en la solicitud"});
  }
}
