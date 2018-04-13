var mongoose = require('mongoose');

//modelos necesarios
var profesor = mongoose.model('profesor');
var institucion = mongoose.model('institucion');
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

//inserta una institucion con el nombre
function insertarInstitucion(Nombre){
  var newInstitucion = new institucion();
  newInstitucion.nombre = Nombre;
  newInstitucion.save(function(err,institucion){
    if(err){
      console.log('Error insertando la institucion \n' + err);
    }else{
      console.log('Institucion nueva insertada')
      return institucion._id;
      console.log(institucion._id)
    }
  })
}
//inserta una escuela con el nombre
function insertarEscuela(Nombre){
  var newEscuela = new escuela();
  newEscuela.nombre = Nombre;
  newEscuela.save(function(err,escuela){
    if(err){
      console.log('Error insertando la escuela \n' + err);
    }else{
      console.log('Escuela nueva insertada')
      return escuela._id;
    }
  })
}

/*
metodo para insertar un profesor
  parametros: nombre, apellidos, institucion (id), escuela (id), usuario y clave
*/
module.exports.insertarUnProfesor = function(req, res) {
  console.log('Insertar Profesor');

  //crea una instancia del modelo profesor
  var newProfesor = new profesor();

  //le asigna nombre y apellidos sin ningun cambio
  newProfesor.nombre = req.body.nombre;
  newProfesor.apellidos = req.body.apellidos;

  //genera un carnet
  newProfesor.carnet = 1; //cambiar esto despues

	newProfesor.institucion = req.body.institucion;
	newProfesor.escuela = req.body.escuela;

	newProfesor.usuario = req.body.usuario;
	newProfesor.clave = req.body.clave;

  newProfesor.save(function(err, profesor) {
    if (err) {
      console.log('Error insertando profesor \n' + err);
    }else{
      //retorna el estudiante salvado
      sendJsonResponse(res, 200, profesor);
			console.log("salva en la base de datos");
    }
  })
}
//modifica un profesor dado su id
module.exports.modificarUnProfesorId = function(req, res){
  if(req.params && req.params.id){
    //tiene parametos y id
    //busca un profesor con ese usuario

    profesor
      .findById(req.params.id)
      .exec(function(err, profesorRes){
        if(!profesorRes){//si no existe, no lo encontró
          sendJsonResponse(res, 404,{"message": "Profesor no encontrado"});
          return
        }else if (err){//si ocurre un error, envia el error
          sendJsonResponse(res,404, err);
          return;
        }

        //realiza las modificaciones
        //asigna nombre y apellido sin ningun cambio
        profesorRes.nombre = req.body.nombre;
        profesorRes.apellidos = req.body.apellidos;

        profesorRes.carnet = 1; //cambiar despues

        //asigna el id de la institucion
        profesorRes.institucion = req.body.institucion;
        profesorRes.escuela = req.body.escuela;
        //guarda el usuario y clave
        profesorRes.usuario = req.body.usuario;
        profesorRes.clave = req.body.clave;
        //salva el profesor en la base de datos
        profesorRes.save(function(err, profesor) {
          if (err) {
            console.log('Error insertando profesor \n' + err);
          }else{
            //retorna el profesor salvado
            sendJsonResponse(res, 200, profesor);
            console.log("salva en la base de datos");
          }
        })
      })
  }else{
    //no se envió un usuario
    sendJsonResponse(res, 404,{"message": "No hay id en la solicitud"});
    }
}

//metodo para buscar un profesor con un usuario
module.exports.leerUnProfesorUsuario = function (req, res) {
	if(req.params && req.params.usuario){
    //tiene parametos y usuario
    //busca un profesor con ese usuario
		profesor
		  .findOne({
				"usuario": req.params.usuario
			})
			.populate('institucion')
			.populate('escuela')
			.populate('grupo')
      //profesorRes es el que encuentra
			.exec(function(err, profesorRes){
				if(!profesorRes){//si no existe, no lo encontró
					sendJsonResponse(res, 404,{"message": "Profesor no encontrado"});
					return
				} else if (err){//si ocurre un error, envia el error
					sendJsonResponse(res,404, err);
					return;
				}
        //encontró el profesor y lo envía en la respuesta
				sendJsonResponse(res, 200,profesorRes);
			});
		}else{
      //no se envió un usuario
			sendJsonResponse(res, 404,{"message": "No hay usuario en la solicitud"});
		}
};
