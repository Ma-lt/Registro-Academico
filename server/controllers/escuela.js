var mongoose = require('mongoose');

//modelos necesarios
var escuela = mongoose.model('escuela');

//metodo para enviar respuesta
var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

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

//metodo para buscar una escuela por nombre e institucion
module.exports.buscarUnaEscuelaId = function(req, res){
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

//metodo para borrar una escuela on ObjectId
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
