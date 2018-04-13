var mongoose = require('mongoose');

//incluye todos los modelos necesarios
require('./conversacion');
require('./curso');
require('./escuela');
require('./estudiante');
require('./foro');
require('./grupo');
require('./institucion');
require('./materia');
require('./profesor');
require('./programaAcademico');

const dbURI = 'mongodb://localhost/SRA';//base de datos que usa
mongoose.Promise = global.Promise;

//conecta el servidor
mongoose.connect(dbURI, function(err){
	if(err){
		console.error("Error!" + err);
	}else{
		console.log("Conectado a la base de datos");
	}
});
