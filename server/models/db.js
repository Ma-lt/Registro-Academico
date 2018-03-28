var mongoose = require('mongoose');
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

const dbURI = 'mongodb://localhost/SRA';
mongoose.Promise = global.Promise;

mongoose.connect(dbURI, function(err){
	if(err){
		console.error("Error!" + err);
	}else{
		console.log("Conectado a la base de datos");
	}
});
