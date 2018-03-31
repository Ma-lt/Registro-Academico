var mongoose = require('mongoose');

//modelos necesarios
var institucion = mongoose.model('institucion');

//metodo para enviar respuesta
var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

//metodo para buscar el ObjectId de una institucion
function getInstitucionID(Nombre) {
  //busca la institucion por el nombre
  var query = institucion.findOne({
    'nombre': Nombre
  })
  console.log("getInstitucionID")
  return query;
}

//metodo para buscar todas las instituciones
module.exports.buscarTodasInstituciones = function(req,res){
  institucion
    .find({})
    .exec(function(err, instituciones){
				if(!instituciones){
					sendJsonResponse(res, 404,{"message": "Instituciones no encontradas"});
					return
				} else if (err){
					sendJsonResponse(res,404, err);
					return;
				}
				sendJsonResponse(res, 200,instituciones);
			});
}

//metodo para insertar una institucion
module.exports.insertarUnaInstitucion = function(req, res) {
  console.log('Insertar Institucion');

  //crea una instancia del modelo institucion
  var newInstitucion = new institucion();

  //le asigna nombre sin ningun cambio
  newInstitucion.nombre = req.body.nombre;

  newInstitucion.save(function(err, institucion){
    if (err) {
      console.log('Error insertando institucion \n' + err);
    }else{
      //retorna el estudiante salvado
      sendJsonResponse(res, 200, institucion);
      console.log("salva en la base de datos");
    }
  })
}

//metodo para insertar una institucion si no existe
module.exports.insertarUnaInstitucionSiNoExiste = function(req, res) {
  console.log('Insertar Institucion si no existe');

	//se fija si la institucion existe

	//crea un query para recuperar el ObjectId
  var query = getInstitucionID(req.body.nombre);

	//ejecuta el query
  query.exec(function(err, institucionRes) {
		if (err){
      console.log(err);
      return;
    }
		if(institucionRes != null){
			sendJsonResponse(res, 200, {"message": "Institucion ya existe"});
			return
		}
	})
	//la institucion no existe, entonces la inserta

  //crea una instancia del modelo institucion
  var newInstitucion = new institucion();

  //le asigna nombre sin ningun cambio
  newInstitucion.nombre = req.body.nombre;

  newInstitucion.save(function(err, institucion){
    if (err) {
      console.log('Error insertando institucion \n' + err);
    }else{
      //retorna la institucion salvada
      sendJsonResponse(res, 200, institucion);
      console.log("salva en la base de datos");
    }
  })
}

//metodo para buscar una institucion por Id
module.exports.buscarInstitucionId = function(req, res){
  if(req.params && req.params.id){
    //tiene parametos y id
    //busca una institucion con ese id
    institucion
      .findById(req.params.id)
      .exec(function(err, institucionRes){
        if(!institucionRes){//si no existe, no lo encontró
          sendJsonResponse(res, 404,{"message": "Institucion no encontrada"});
					return
        }else if (err){//si ocurre un error, envia el error
					sendJsonResponse(res,404, err);
					return;
				}
        //encontró la institucion y la envía en la respuesta
				sendJsonResponse(res, 200,institucionRes);
      })
  }else{
    //no se envió un nombre
    sendJsonResponse(res, 404,{"message": "No hay nombre en la solicitud"});
  }
}

//metodo para borrar una institucion on ObjectId
module.exports.eliminarUnaInsitucionId = function(req, res){
  if(req.params && req.params.id){
    //tiene parametos y id
    //busca una institucion con ese id
    institucion
      .remove({"_id": req.params.id})
      .exec(function(err, institucionRes){
        if(!institucionRes){//si no existe, no lo encontró
          sendJsonResponse(res, 404,{"message": "Instucion no encontrada"});
					return
        }else if (err){//si ocurre un error, envia el error
					sendJsonResponse(res,404, err);
					return;
				}
        sendJsonResponse(res, 200,{"message": "Institucion eliminada"});
      })
  }
}

//metodo para modificar una institucion con ObjectId
module.exports.modificarUnaInstitucionId = function(req, res){
  if(req.params && req.params.id){
    //tiene parametos y id
    //busca una institucion con ese id
    institucion
      .findById(req.params.id)
      .exec(function(err, institucionRes){
        if(!institucionRes){//si no existe, no lo encontró
					sendJsonResponse(res, 404,{"message": "Instucion no encontrada"});
					return
				}else if (err){//si ocurre un error, envia el error
					sendJsonResponse(res,404, err);
					return;
				}

        //realiza las modificaciones
				//asigna nombre sin ningun cambio
				institucionRes.nombre = req.body.nombre;
        institucionRes.save(function(err, institucion){
          if(err){
            console.log('Error modificando institucion \n' + err);
          }else{
            //retorna la institucion salvada
            sendJsonResponse(res, 200, institucion);
            console.log("salva en la base de datos");
          }
        })
      })
  }else{
    //no se envió un id
    sendJsonResponse(res, 404,{"message": "No hay id en la solicitud"});
  }
}
