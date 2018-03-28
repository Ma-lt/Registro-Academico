const express = require ('express');
const router = express.Router();

//controladores
const ctrlEstudiantes = require('../controllers/estudiante')
const ctrlProfesores = require('../controllers/profesor')

//funcion de prueba para saber que api funciona
router.get('/prueba', function(req, res){
	res.send('api works');
});

//llamar a las funciones de los controladores

//estudiante
router.get('/estudiante/:usuario', ctrlEstudiantes.leerUnEstudianteUsuario);
router.post('/estudiante', ctrlEstudiantes.insertarUnEstudiante);
//router.put('/estudiante/:id', ctrlEstudiantes.modificarUnEstudianteId);

//Profesor
router.get('/profesor/:usuario', ctrlProfesores.leerUnProfesorUsuario);
router.post('/profesor', ctrlProfesores.insertarUnProfesor);

module.exports = router;
