const express = require ('express');
const router = express.Router();

//controladores
const ctrlEstudiantes = require('../controllers/estudiante')

//funcion de prueba para saber que api funciona
router.get('/prueba', function(req, res){
	res.send('api works');
});

//llamar a las funciones de los controladores
router.get('/estudiante/:usuario', ctrlEstudiantes.leerUnEstudianteUsuario);

router.post('/estudiante', ctrlEstudiantes.insertarUnEstudiante);

module.exports = router;
