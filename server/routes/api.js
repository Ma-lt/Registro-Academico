const express = require ('express');
const router = express.Router();

//controladores
const ctrlEstudiantes = require('../controllers/estudiante')
const ctrlProfesores = require('../controllers/profesor')
const ctrlInsituciones = require('../controllers/institucion')
const ctrlEscuelas = require('../controllers/escuela')
const ctrlProgramas = require('../controllers/programaAcademico')
const ctrlMaterias = require('../controllers/materia')
const ctrlCursos = require('../controllers/curso')
const ctrlGrupos = require('../controllers/grupo')

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
router.put('/profesor/:id', ctrlProfesores.modificarUnProfesorId);

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
router.get('/programas/:institucion/:escuela', ctrlProgramas.buscarTodosProgramasAcademicos);
router.get('/programa/:id', ctrlProgramas.buscarUnProgramaAcademicoId);
router.post('/programa', ctrlProgramas.insertarUnProgramaAcademico);
router.delete('/programa/:id', ctrlProgramas.eliminarUnProgramaAcademicoId);
router.put('/programa/:id', ctrlProgramas.eliminarUnProgramaAcademicoId);
router.put('/programa-agM/:id', ctrlProgramas.agregarMateriaPlanAcademico);
router.put('/programa-elM/:id', ctrlProgramas.eliminarMateriaPlanAcademico);

//materia
router.get('/materias/:institucion', ctrlMaterias.buscarTodasMaterias);
router.get('/materia/:id', ctrlMaterias.buscarUnaMateriaId);
router.post('/materia', ctrlMaterias.insertarUnaMateria);
router.delete('/materia/:id', ctrlMaterias.eliminarUnaMateriaId);
router.put('/materia/:id', ctrlMaterias.modificarUnaMateriaId);

//cursos
router.get('/cursos/:institucion', ctrlCursos.buscarTodosCursos);
router.get('/curso/:id', ctrlCursos.buscarUnCursoId);
router.post('/curso', ctrlCursos.insertarUnCurso);
router.delete('/curso/:id', ctrlCursos.eliminarUnCursoId);
router.put('/materia/:id', ctrlCursos.modificarUnCursoId);

//grupos

router.get('/grupo/:id', ctrlGrupos.buscarUnGrupoId);
router.post('/grupo', ctrlGrupos.insertarUnGrupo);
router.delete('/grupo/:id', ctrlGrupos.eliminarUnGrupoId);
router.put('/grupo/:id', ctrlGrupos.modificarUnGrupoId);

//exporta el api
module.exports = router;
