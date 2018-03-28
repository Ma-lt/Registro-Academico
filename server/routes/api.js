const express = require ('express');
const router = express.Router();

//controladores
const ctrlEstudiantes = require('../controllers/estudiante')
const ctrlProfesores = require('../controllers/profesor')
const ctrlInsituciones = require('../controllers/institucion')
const ctrlEscuela = require('../controllers/escuela')

//funcion de prueba para saber que api funciona
router.get('/prueba', function(req, res){
	res.send('api works');
});

//llamar a las funciones de los controladores

//estudiante
router.get('/estudiante/:usuario', ctrlEstudiantes.leerUnEstudianteUsuario);
router.post('/estudiante', ctrlEstudiantes.insertarUnEstudiante);
router.put('/estudiante/:id', ctrlEstudiantes.modificarUnEstudianteId);

//Profesor
router.get('/profesor/:usuario', ctrlProfesores.leerUnProfesorUsuario);
router.post('/profesor', ctrlProfesores.insertarUnProfesor);

//Institucion
router.get('/institucion/:id', ctrlInsituciones.buscarInstitucionId);
router.get('/instituciones', ctrlInsituciones.buscarTodasInstituciones);
router.post('/institucion', ctrlInsituciones.insertarUnaInstitucion);
router.delete('/institucion/:id', ctrlInsituciones.eliminarUnaInsitucionId);
router.put('/institucion/:id', ctrlInsituciones.modificarUnaInstitucionId);

//escuela
router.get('/escuelas/:institucion', ctrlEscuela.buscarTodasEscuelas);
router.get('/escuela/:id', ctrlEscuela.buscarUnaEscuelaId);
router.post('/escuela/:id', ctrlEscuela.insertarUnaEscuela);
router.delete('/escuela/:id', ctrlEscuela.eliminarUnaEscuelaId);
router.put('/escuela/:id', ctrlEscuela.modificarUnaEscuelaId);

module.exports = router;
