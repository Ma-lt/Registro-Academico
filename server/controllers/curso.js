var mongoose = require('mongoose');

//modelos necesarios
var materia = mongoose.model('materia');
var curso = mongoose.model('curso');


//metodo para enviar respuesta
var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

//metodo para buscar todas los cursos de una institucion
module.exports.buscarTodosCursos = function(req,res){
  if(req.params && req.params.institucion){
		//tiene parametros e institucion
    curso
      .find({})
			.populate({
				path: 'materia',
				match: {
					institucion: req.params.institucion
				}
			})
      .populate('grupos')
      .exec(function(err, cursos){
  				if(!cursos){//si no retorna los cursos
  					sendJsonResponse(res, 404,{"message": "Cursos no encontradas"});
  					return
  				} else if (err){//si hay un erro
  					sendJsonResponse(res,404, err);
  					return;
  				}
					//todo sale bien
  				sendJsonResponse(res, 200,cursos);
  			});
    }else{//no hay institucion
      sendJsonResponse(res, 404,{"message": "No hay institucion en la solicitud"});
    }
}

//metodo para buscar un curso por id
module.exports.buscarUnCursoId = function(req, res){
  if(req.params && req.params.id){
    //tiene parametos y id
    //busca un curso con ese id
    curso
      .findById(req.params.id)//busca el curso
			.populate('materia')
			.populate('grupos')
      .exec(function(err, cursoRes){
        if(!cursoRes){//si no existe, no lo encontró
          sendJsonResponse(res, 404,{"message": "Curso no encontrado"});
					return
        }else if (err){//si ocurre un error, envia el error
					sendJsonResponse(res,404, err);
					return;
				}
        //encontró la materia y la envía en la respuesta
				sendJsonResponse(res, 200,cursoRes);
      })
  }else{
    sendJsonResponse(res, 404,{"message": "No hay id en la solicitud"});
  }
}

//metodo para insertar un curso
//recibe el objectId de materia
module.exports.insertarUnCurso = function(req, res) {
  console.log('Insertar Curso');

  //crea una instancia del modelo curso
  var newCurso = new curso();

	//le asigna semestre, anho y materia
	newCurso.semestre = parseInt(req.body.semestre);
	newCurso.anho = parseInt(req.body.anho);
	newCurso.materia = req.body.materia;

	//salva el nuevo curso
  newCurso.save(function(err, curso){
    if (err) {//si hay errores
      console.log('Error insertando curso \n' + err);
    }else{//no hay errores
      //retorna el estudiante salvado
      sendJsonResponse(res, 200, curso);
      console.log("salva en la base de datos");
    }
  })
}

//metodo para borrar un curso con ObjectId
module.exports.eliminarUnCursoId = function(req, res){
  if(req.params && req.params.id){
    //tiene parametos y id
    //busca un curso con ese id
    curso
      .remove({"_id": req.params.id})//busca el curso y lo borra
      .exec(function(err, cursoRes){
        if(!cursoRes){//si no existe, no lo encontró
          sendJsonResponse(res, 404,{"message": "Curso no encontrado"});
					return
        }else if (err){//si ocurre un error, envia el error
					sendJsonResponse(res,404, err);
					return;
				}
				//borra el curso debidamente
        sendJsonResponse(res, 200,{"message": "Curso eliminada"});
      })
  }
}

//metodo para modificar un curso con ObjectId
module.exports.modificarUnCursoId = function(req, res){
  if(req.params && req.params.id){
    //tiene parametos y id
    //busca un curso con ese id
    curso
      .findById(req.params.id)//busca el curso con el id
      .exec(function(err, cursoRes){
        if(!cursoRes){//si no existe, no lo encontró
					sendJsonResponse(res, 404,{"message": "Curso no encontrada"});
					return
				}else if (err){//si ocurre un error, envia el error
					sendJsonResponse(res,404, err);
					return;
				}

        //realiza las modificaciones
				cursoRes.semestre = parseInt(req.body.semestre);
				cursoRes.anho = parseInt(req.body.anho);
				cursoRes.materia = req.body.materia;
				//salva las modificaciones
        cursoRes.save(function(err, curso){
          if(err){//si ocurre un error
            console.log('Error modificando curso \n' + err);
          }else{
            //retorna el materia salvada
            sendJsonResponse(res, 200, curso);
            console.log("salva en la base de datos");
          }
        })
      })
  }else{
    //no se envió un id
    sendJsonResponse(res, 404,{"message": "No hay id en la solicitud"});
  }
}

//agrega un grupo a un curso
module.exports.agregarGrupo = function(req, res){
    console.log("InsertandoGrupos");
  if(req.params && req.params.idCurso && req.params.idGrupo){
    //tiene parametos y id
    //busca un curso con ese id
    curso
      .findById(req.params.idCurso)//busca el curso por id
      .exec(function(err, cursoRes){
        if(!cursoRes){//si no existe, no lo encontró
					sendJsonResponse(res, 404,{"message": "Curso no encontrada"});
					return
				}else if (err){//si ocurre un error, envia el error
					sendJsonResponse(res,404, err);
					return;
				}

        //agrega un grupo al curso
				cursoRes.grupos.push(req.params.idGrupo);
				//salva el curso con el nuevo grupo
        cursoRes.save(function(err, curso){
          if(err){//si hay errores
            console.log('Error modificando curso \n' + err);
          }else{
            //retorna el materia salvada
            sendJsonResponse(res, 200, curso);
            console.log("salva en la base de datos");
          }
        })
      })
  }else{
    //no se envió un id
    sendJsonResponse(res, 404,{"message": "No hay id en la solicitud"});
  }
}
//elimina a un grupo de un curso
module.exports.eliminarGrupo = function(req, res){
    console.log("Elminando Grupos");
  if(req.params && req.params.idCurso && req.params.idGrupo){
    //tiene parametos y id
    //busca un curso con ese id
    curso
      .findById(req.params.idCurso)//busca el curso por id
      .exec(function(err, cursoRes){
        if(!cursoRes){//si no existe, no lo encontró
					sendJsonResponse(res, 404,{"message": "Curso no encontrada"});
					return
				}else if (err){//si ocurre un error, envia el error
					sendJsonResponse(res,404, err);
					return;
				}

        //saca el grupo de la lista de grupos
				cursoRes.grupos.pull(req.params.idGrupo);
				//salva el curso con las modiicaciones
        cursoRes.save(function(err, curso){
          if(err){//si hay errores
            console.log('Error modificando curso \n' + err);
          }else{
            //retorna el materia salvada
            sendJsonResponse(res, 200, curso);
            console.log("salva en la base de datos");
          }
        })
      })
  }else{
    //no se envió un id
    sendJsonResponse(res, 404,{"message": "No hay id en la solicitud"});
  }
}


//metodo para obtener  un curso con institucion y materia
module.exports.buscarCursosPorMateria = function(req,res){
  console.log("BUSCANDO CURSO POR MATERIA")
  if(req.params && req.params.materia){
    curso//busca el curso por materia
      .find({
        materia: req.params.materia
      })
      .populate('materia')
      .exec(function(err, cursos){
          if(!cursos){//si no retorna ningun curso
            sendJsonResponse(res, 404,{"message": "Cursos no encontradas"});
            return
          } else if (err){//si hay errores
            sendJsonResponse(res,404, err);
            return;
          }
          sendJsonResponse(res, 200,cursos);
        });
    }else{
      sendJsonResponse(res, 404,{"message": "No hay institucion en la solicitud"});
    }
}
