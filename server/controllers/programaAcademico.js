var mongoose = require('mongoose');

//modelos necesarios
var programaAcademico = mongoose.model('programaAcademico');
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

//metodo para buscar todos los programas academicos de una institucion
//recibe el id de la institucion
module.exports.buscarTodosProgramasAcademicos = function(req,res){
  if(req.params && req.params.institucion){
    programaAcademico
      .find({
        "institucion": req.params.institucion
      })
      .exec(function(err, programas){
  				if(!programas){
  					sendJsonResponse(res, 404,{"message": "Programas no encontrados"});
  					return
  				} else if (err){
  					sendJsonResponse(res,404, err);
  					return;
  				}
  				sendJsonResponse(res, 200,programas);
  			});
    }else{
      sendJsonResponse(res, 404,{"message": "No hay institucion en la solicitud"});
    }
}

//metodo para buscar un programa academico por id
module.exports.buscarUnProgramaAcademicoId = function(req, res){
  if(req.params && req.params.id){
    //tiene parametos y id
    //busca un programa academico con ese id
    programaAcademico
      .findById(req.params.id)
			.populate('institucion')
			.populate('escuela')
			.populate('materia')
      .exec(function(err, programaRes){
        if(!programaRes){//si no existe, no lo encontró
          sendJsonResponse(res, 404,{"message": "Programa Academico no encontrado"});
					return
        }else if (err){//si ocurre un error, envia el error
					sendJsonResponse(res,404, err);
					return;
				}
        //encontró el programa academico y lo envía en la respuesta
				sendJsonResponse(res, 200,programaRes);
      })
  }else{
    sendJsonResponse(res, 404,{"message": "No hay id en la solicitud"});
  }
}


//metodo para insertar un programaAcademico
//recibe el objectId de institucion
module.exports.insertarUnProgramaAcademico = function(req, res) {
  console.log('Insertar Programa');

  //crea una instancia del modelo estudiante
  var newProgramaAcademico = new programaAcademico();

  //le asigna nombre sin ningun cambio
  newProgramaAcademico.nombre = req.body.nombre;
  newProgramaAcademico.institucion = req.body.institucion;

  //asigna el nombre de la escuela a una variable
  var escuela = req.body.escuela;
  //crea un query para recuperar el ObjectId
  var query = getEscuelaID(escuela, req.body.institucion);
  //ejecuta el query
  query.exec(function(err, escuelaRes){
    if(err)
      return console.log(err);
    //asigna el ObjectId
    newProgramaAcademico.escuela = escuelaRes._id;
    newProgramaAcademico.save(function(err, programaAcademico){
      if (err) {
        console.log('Error insertando programa \n' + err);
      }else{
        //retorna el estudiante salvado
        sendJsonResponse(res, 200, programaAcademico);
        console.log("salva en la base de datos");
      }
    })
  })
}

//metodo para borrar un programaAcademico con ObjectId
module.exports.eliminarUnProgramaAcademicoId = function(req, res){
  if(req.params && req.params.id){
    //tiene parametos y id
    //busca un programa academico con ese id
    programaAcademico
      .remove({"_id": req.params.id})
      .exec(function(err, programaRes){
        if(!programaRes){//si no existe, no lo encontró
          sendJsonResponse(res, 404,{"message": "Programa academico no encontrado"});
					return
        }else if (err){//si ocurre un error, envia el error
					sendJsonResponse(res,404, err);
					return;
				}
        sendJsonResponse(res, 200,{"message": "Programa academico eliminado"});
      })
  }
}

//metodo para modificar un programa academico con ObjectId
//aqui solo se puede cambiar el nombre
module.exports.modificarUnProgramaAcademicoId = function(req, res){
  if(req.params && req.params.id){
    //tiene parametos y id
    //busca un programa academico con ese id
    programaAcademico
      .findById(req.params.id)
      .exec(function(err, programaRes){
        if(!programaRes){//si no existe, no lo encontró
					sendJsonResponse(res, 404,{"message": "Programa no encontrado"});
					return
				}else if (err){//si ocurre un error, envia el error
					sendJsonResponse(res,404, err);
					return;
				}

        //realiza las modificaciones
				//asigna nombre sin ningun cambio
				programaRes.nombre = req.body.nombre;

        programaRes.save(function(err, programa){
          if(err){
            console.log('Error modificando programa \n' + err);
          }else{
            //retorna el escuela salvada
            sendJsonResponse(res, 200, programa);
            console.log("salva en la base de datos");
          }
        })
      })
  }else{
    //no se envió un id
    sendJsonResponse(res, 404,{"message": "No hay id en la solicitud"});
  }
}
