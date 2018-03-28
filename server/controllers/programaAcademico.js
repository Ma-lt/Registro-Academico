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
