var mongoose = require('mongoose');

//modelos necesarios
var estudiante = mongoose.model('estudiante');
var institucion = mongoose.model('institucion');
var programaAcademico = mongoose.model('programaAcademico');
var escuela = mongoose.model('escuela');

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

//metodo para buscar el ObjectId de un programaAcademico
//Institucion es un ObjectId
function getProgramaAcademicoID(Nombre, Institucion) {
  //busca el programa academico por el nombre y la institucion
  var query = programaAcademico.findOne({
    'nombre': Nombre,
    'institucion' : Institucion
  }, function(err, programaRes) {
    if (err){
      return handleError(err);
    }
  })

  return query;
}

/*
metodo para insertar un estudiante
  parametros: nombre, apellidos, institucion, escuela, programaAcademico, usuario y clave
*/

//metodo para modificar estudiante
module.exports.insertarUnEstudiante = function(req, res){
	console.log('Insertar Estudiante');

  //crea una instancia del modelo estudiante
  var newEstudiante = new estudiante();

	//asigna nombre y apellido sin ningun cambio
	newEstudiante.nombre = req.body.nombre;
	newEstudiante.apellidos = req.body.apellidos;

	newEstudiante.carnet = 1; //cambiar despues

	//asigna el id de la institucion
  newEstudiante.institucion = req.body.institucion;
	newEstudiante.escuela = req.body.escuela;
	newEstudiante.programaAcademico = req.body.programaAcademico;
  //guarda el usuario y clave
  newEstudiante.usuario = req.body.usuario;
  newEstudiante.clave = req.body.clave;
  //salva el estudiante en la base de datos
  newEstudiante.save(function(err, estudiante) {
    if (err) {
      console.log('Error insertando estudante \n' + err);
    }else{
      //retorna el estudiante salvado
      sendJsonResponse(res, 200, estudiante);
			console.log("salva en la base de datos");
    }
  })
}


//metodo para buscar un estudiante con un usuario
module.exports.leerUnEstudianteUsuario = function (req, res) {
	if(req.params && req.params.usuario){
    //tiene parametos y usuario
    //busca un estudiante con ese usuario
		estudiante
		  .findOne({
				"usuario": req.params.usuario
			})
			.populate('institucion')
			.populate('programaAcademico')
			.populate('escuela')
      //estudianteRes es el que encuentra
			.exec(function(err, estudianteRes){
				if(!estudianteRes){//si no existe, no lo encontró
					sendJsonResponse(res, 404,{"message": "Estudiante no encontrado"});
					return
				} else if (err){//si ocurre un error, envia el error
					sendJsonResponse(res,404, err);
					return;
				}
        //encontró el estudiante y lo envía en la respuesta
				sendJsonResponse(res, 200,estudianteRes);
			});
		}else{
      //no se envió un usuario
			sendJsonResponse(res, 404,{"message": "No hay usuario en la solicitud"});
		}
};

//metodo para modificar estudiante
module.exports.modificarUnEstudianteId = function(req, res){
	if(req.params && req.params.id){
    //tiene parametos y id
    //busca un estudiante con ese usuario

		estudiante
			.findById(req.params.id)
			.exec(function(err, estudianteRes){
				if(!estudianteRes){//si no existe, no lo encontró
					sendJsonResponse(res, 404,{"message": "Estudiante no encontrado"});
					return
				}else if (err){//si ocurre un error, envia el error
					sendJsonResponse(res,404, err);
					return;
				}

				//realiza las modificaciones
				//asigna nombre y apellido sin ningun cambio
				estudianteRes.nombre = req.body.nombre;
				estudianteRes.apellidos = req.body.apellidos;

				estudianteRes.carnet = 1; //cambiar despues

				//asigna el id de la institucion
			  estudianteRes.institucion = req.body.institucion;
				estudianteRes.escuela = req.body.escuela;
				estudianteRes.programaAcademico = req.body.programaAcademico;
			  //guarda el usuario y clave
			  estudianteRes.usuario = req.body.usuario;
			  estudianteRes.clave = req.body.clave;
			  //salva el estudiante en la base de datos
			  estudianteRes.save(function(err, estudiante) {
			    if (err) {
			      console.log('Error insertando estudante \n' + err);
			    }else{
			      //retorna el estudiante salvado
			      sendJsonResponse(res, 200, estudiante);
						console.log("salva en la base de datos");
			    }
			  })
			})
	}else{
    //no se envió un usuario
		sendJsonResponse(res, 404,{"message": "No hay id en la solicitud"});
		}
}
