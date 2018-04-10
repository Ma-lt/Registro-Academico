var mongoose = require('mongoose');

//modelos necesarios
var materia = mongoose.model('materia');
var curso = mongoose.model('curso');
var grupo = mongoose.model('grupo');

//metodo para enviar respuesta
var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

var numeroGrupo = function(cursoP){
  query =
  grupo
    .findOne({
      "curso":cursoP
    })
    .sort({numero : -1})
  return query;
}

//metodo para buscar todas los grupos de una institucion
module.exports.buscarTodosGrupos = function(req,res){
  if(req.params && req.params.institucion){
    grupo
      .find({})
			.populate({
				path: 'curso',
				populate: ({
					path: 'materia',
					match: {
						institucion: req.params.institucion
					}
				})
			})
      .exec(function(err, cursos){
  				if(!cursos){
  					sendJsonResponse(res, 404,{"message": "Cursos no encontradas"});
  					return
  				} else if (err){
  					sendJsonResponse(res,404, err);
  					return;
  				}
  				sendJsonResponse(res, 200,cursos);
  			});
    }else{
      sendJsonResponse(res, 404,{"message": "No hay institucion en la solicitud"});
    }
}

//metodo para buscar un grupo por id
module.exports.buscarUnGrupoId = function(req, res){
  if(req.params && req.params.id){
    //tiene parametos y id
    //busca un curso con ese id
    grupo
      .findById(req.params.id)
			.populate('estudiante')
			.populate('curso')
      .exec(function(err, grupoRes){
        if(!grupoRes){//si no existe, no lo encontró
          sendJsonResponse(res, 404,{"message": "Grupo no encontrado"});
					return
        }else if (err){//si ocurre un error, envia el error
					sendJsonResponse(res,404, err);
					return;
				}
        //encontró la materia y la envía en la respuesta
				sendJsonResponse(res, 200,grupoRes);
      })
  }else{
    sendJsonResponse(res, 404,{"message": "No hay id en la solicitud"});
  }
}

//metodo para insertar un grupo
//recibe el objectId de curso
module.exports.insertarUnGrupo = function(req, res) {
  console.log('Insertar Grupo');

  //crea una instancia del modelo grupo
  var newGrupo = new grupo();

	//le asigna datos
  newGrupo.curso = req.body.curso;
  query = numeroGrupo(req.body.curso);
  query
    .exec(function(err, maxGrupo){
      if (err){
        console.log(err);
        return;
      }
      if(maxGrupo == null){
        newGrupo.numero = 1;
      }else{
        console.log(maxGrupo)
        newGrupo.numero = maxGrupo.numero + 1;
      }

      newGrupo.save(function(err, grupo){
        if (err) {
          console.log('Error insertando grupo \n' + err);
        }else{
          //retorna el estudiante salvado
          sendJsonResponse(res, 200, grupo);
          console.log("salva en la base de datos");
        }
      })
    })
}

//metodo para borrar un grupo con ObjectId
module.exports.eliminarUnGrupoId = function(req, res){
  console.log("eliminar Grupo");
  if(req.params && req.params.id){
    //tiene parametos y id
    //busca un curso con ese id
    grupo
      .remove({"_id": req.params.id})
      .exec(function(err, grupoRes){
        if(!grupoRes){//si no existe, no lo encontró
          sendJsonResponse(res, 404,{"message": "Grupo no encontrado"});
					return
        }else if (err){//si ocurre un error, envia el error
					sendJsonResponse(res,404, err);
					return;
				}
        sendJsonResponse(res, 200,{"message": "Grupo eliminado"});
      })
  }
}

//metodo para modificar un grupo con ObjectId
module.exports.modificarUnGrupoId = function(req, res){
  if(req.params && req.params.id){
    //tiene parametos y id
    //busca un grupo con ese id
    grupo
      .findById(req.params.id)
      .exec(function(err, grupoRes){
        if(!grupoRes){//si no existe, no lo encontró
					sendJsonResponse(res, 404,{"message": "Grupo no encontrada"});
					return
				}else if (err){//si ocurre un error, envia el error
					sendJsonResponse(res,404, err);
					return;
				}

        //realiza las modificaciones
				grupoRes.curso = req.body.curso;

        grupoRes.save(function(err, grupo){
          if(err){
            console.log('Error modificando grupo \n' + err);
          }else{
            //retorna el materia salvada
            sendJsonResponse(res, 200, grupo);
            console.log("salva en la base de datos");
          }
        })
      })
  }else{
    //no se envió un id
    sendJsonResponse(res, 404,{"message": "No hay id en la solicitud"});
  }
}

module.exports.matricularEstudiante = function(req, res){
	if(req.params && req.params.id){
		grupo
      .findById(req.params.id)
      .exec(function(err, grupoRes){
				//agrega el estudiante a los estudiantes matriculados
				grupoRes.estudiantes.push(req.body.estudiante);
				grupoRes.save(function(err, grupo){
          if(err){
            console.log('Error matriculando estudiante en el grupo \n' + err);
          }else{
            //retorna el materia salvada
            sendJsonResponse(res, 200, grupo);
            console.log("salva en la base de datos");
          }
        })
			})
	}else{
    //no se envió un id
    sendJsonResponse(res, 404,{"message": "No hay id en la solicitud"});
  }
}
