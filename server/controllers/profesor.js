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

module.exports.modificarUnProfesorId = function(req,res) {
  console.log("Modificar profesor ")
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
          if(institucionRes == null){
          //si no existe la institucion
          //se crea
            profesorRes.institucion = insertarInstitucion(institucion);
          }else{
          //asigna el ObjectId
            profesorRes.escuela = escuelaRes._id;
          }
          var escuela = req.body.escuela;
          //crea un query para recuperar el ObjectId
          var query2 = getEscuelaID(escuela, profesorRes.institucion);
          //ejecuta el query
          query2.exec(function(err, escuelaRes){
            if(err)
              return console.log(err);
            if(escuelaRes == null){
              //si no existe la escuela
              profesorRes.escuela =  insertarEscuela(escuela);
            }else{
              //asigna el ObjectId
              profesorRes.escuela = escuelaRes._id;
            }
            //asigna usuario y clave sin ningun cambio
            profesorRes.usuario = req.body.usuario;
            profesorRes.clave = req.body.clave;
            //salva el profesor en la base de datos
            profesorRes.save(function(err, profesor) {
              if (err) {
                console.log('Error modificando profesor \n' + err);
              }else{
                //retorna el profesor salvado
                sendJsonResponse(res, 200, profesor);
                console.log("salva en la base de datos");
             }
      })
    })
  });
});
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
