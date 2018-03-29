var mongoose = require('mongoose');

//modelos necesarios
var materia = mongoose.model('materia');

//metodo para enviar respuesta
var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

//metodo para buscar todas las materias de una institucion
module.exports.buscarTodasMaterias = function(req,res){
  if(req.params && req.params.institucion){
    materia
      .find({
        "institucion": req.params.institucion
      })
      .exec(function(err, materias){
  				if(!materias){
  					sendJsonResponse(res, 404,{"message": "Materias no encontradas"});
  					return
  				} else if (err){
  					sendJsonResponse(res,404, err);
  					return;
  				}
  				sendJsonResponse(res, 200,materias);
  			});
    }else{
      sendJsonResponse(res, 404,{"message": "No hay institucion en la solicitud"});
    }
}


//metodo para insertar una materia
//recibe el objectId de institucion
module.exports.insertarUnaMateria = function(req, res) {
  console.log('Insertar Materia');

  //crea una instancia del modelo estudiante
  var newMateria = new materia();

  //le asigna nombre sin ningun cambio
  newMateria.nombre = req.body.nombre;
  newMateria.institucion = req.body.institucion;
  newMateria.save(function(err, materia){
    if (err) {
      console.log('Error insertando materia \n' + err);
    }else{
      //retorna el estudiante salvado
      sendJsonResponse(res, 200, materia);
      console.log("salva en la base de datos");
    }
  })
}
