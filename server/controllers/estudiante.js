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

//metodo para buscar el ObjectId de un programaAcademico
//Institucion es un ObjectId
function getProgramaAcademicoID(Nombre, Institucion,Escuela) {
  //busca el programa academico por el nombre y la institucion
  var query = programaAcademico.findOne({
    'nombre': Nombre,
    'institucion' : Institucion,
		'escuela': Escuela
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
	newEstudiante.nombre = req.params.nombre;
	newEstudiante.apellidos = req.params.apellidos;

	newEstudiante.carnet = 1; //cambiar despues

	//asigna el nombre de institucion en una variable
  var institucion = req.body.institucion;
  //crea un query para recuperar el ObjectId
  var query = getInstitucionID(institucion);
  //ejecuta el query
	query.exec(function(err, institucionRes) {
    if (err){
      console.log(err);
      return;
    }
		//asigna el ObjectId
    newEstudiante.institucion = institucionRes._id;
    //asigna el nombre de la escuela a una variable
    var escuela = req.body.escuela;
    //crea un query para recuperar el ObjectId
    var query2 = getEscuelaID(escuela, institucionRes._id);
    //ejecuta el query
		query2.exec(function(err, escuelaRes){
      if(err)
        return console.log(err);
      //asigna el ObjectId
      newEstudiante.escuela = escuelaRes._id;
      //guarda el nombre de programa academico en una variable
      var programaAcademico = req.body.programaAcademico;
      //crea un query para recuperar el ObjectId
      var query3 = getProgramaAcademicoID(programaAcademico, institucionRes._id, escuelaRes._id);
			//ejecuta el query
      query3.exec(function(err, programaRes){
        if(err)
          return console.log(err);
        //asigna el ObjectId
        newEstudiante.programaAcademico = programaRes._id;
        //asigna usuario y clave sin ningun cambio
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
			})
		})
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
				estudianteRes.nombre = req.params.nombre;
				estudianteRes.apellidos = req.params.apellidos;

				//asigna el nombre de institucion en una variable
			  var institucion = req.body.institucion;
			  //crea un query para recuperar el ObjectId
			  var query = getInstitucionID(institucion);
			  //ejecuta el query
				query.exec(function(err, institucionRes) {
			    if (err){
			      console.log(err);
			      return;
			    }
					//asigna el ObjectId
			    estudianteRes.institucion = institucionRes._id;
			    //asigna el nombre de la escuela a una variable
			    var escuela = req.body.escuela;
			    //crea un query para recuperar el ObjectId
			    var query2 = getEscuelaID(escuela, institucionRes._id);
			    //ejecuta el query
					query2.exec(function(err, escuelaRes){
			      if(err)
			        return console.log(err);
			      //asigna el ObjectId
			      estudianteRes.escuela = escuelaRes._id;
			      //guarda el nombre de programa academico en una variable
			      var programaAcademico = req.body.programaAcademico;
			      //crea un query para recuperar el ObjectId
			      var query3 = getProgramaAcademicoID(programaAcademico, institucionRes._id);
						//ejecuta el query
			      query3.exec(function(err, programaRes){
			        if(err)
			          return console.log(err);
			        //asigna el ObjectId
			        estudianteRes.programaAcademico = programaRes._id;
			        //asigna usuario y clave sin ningun cambio
			        estudianteRes.usuario = req.body.usuario;
			        estudianteRes.clave = req.body.clave;
			        //salva el estudiante en la base de datos
			        estudianteRes.save(function(err, estudiante) {
			          if (err) {
			            console.log('Error modificando estudante \n' + err);
			          }else{
			            //retorna el estudiante salvado
			            sendJsonResponse(res, 200, estudiante);
									console.log("salva en la base de datos");
			          }
			        })
						})
					})
				})
			});
	}else{
    //no se envió un usuario
		sendJsonResponse(res, 404,{"message": "No hay id en la solicitud"});
		}
}
