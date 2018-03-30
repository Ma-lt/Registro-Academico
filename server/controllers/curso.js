var mongoose = require('mongoose');

//modelos necesarios
var materia = mongoose.model('materia');
var curso = mongoose.model('curso');


//metodo para enviar respuesta
var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.j



function getMateria(nombre) {
	var query = materia.findOne({
		'nombre': Nombre
	})
	console.log('get Materia');
	return query;
}


module.exports.imsertarCurso = function(req,res) {
	//crea una nuea instancia de modelo curso
	var newCurso = new curso();

	//le asigna semestre y anho
	newCurso.semestre = parseInt(req.body.semestre);
	newCurso.año = parseInt(req.body.año);

	//crea un query para recuperar el ObjectId
  var query = getMateria(req.body.materia);
  query.exec(function(err, materiaRes) {
  	if(err)
        return console.log(err);
    else {
    	newCurso.materia = materiaRes._id
    }

  });	

}


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
