const express = require ('express');
const router = express.Router();

//controladores
const ctrlEstudiantes = require('../controllers/estudiante')
const ctrlProfesores = require('../controllers/profesor')
const ctrlInsituciones = require('../controllers/institucion')
const ctrlEscuelas = require('../controllers/escuela')
const ctrlProgramas = require('../controllers/programaAcademico')
const ctrlMaterias = require('../controllers/materia')

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
router.get('/escuelas/:institucion', ctrlEscuelas.buscarTodasEscuelas);
router.get('/escuela/:id', ctrlEscuelas.buscarUnaEscuelaId);
router.post('/escuela', ctrlEscuelas.insertarUnaEscuela);
router.delete('/escuela/:id', ctrlEscuelas.eliminarUnaEscuelaId);
router.put('/escuela/:id', ctrlEscuelas.modificarUnaEscuelaId);

//programaAcademico
router.get('/programas/:institucion', ctrlProgramas.buscarTodosProgramasAcademicos);
router.get('/programa/:id', ctrlProgramas.buscarUnProgramaAcademicoId);
router.post('/programa', ctrlProgramas.insertarUnProgramaAcademico);
router.delete('/programa/:id', ctrlProgramas.eliminarUnProgramaAcademicoId);
router.put('/programa/:id', ctrlProgramas.eliminarUnProgramaAcademicoId);

//materia
router.get('/materias/:institucion', ctrlMaterias.buscarTodasMaterias);

router.post('/materia', ctrlMaterias.insertarUnaMateria);

module.exports = router;
