const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

require('./server/models/db');

//todos los modelos
//necesario importarlos para que los lea antes que el api
//sino da un error de que no existen
/*
require('./server/models/conversacion');
require('./server/models/curso');
require('./server/models/escuela');
require('./server/models/estudiante');
require('./server/models/foro');
require('./server/models/grupo');
require('./server/models/institucion');
require('./server/models/materia');
require('./server/models/profesor');
require('./server/models/programaAcademico');*/

const api = require('./server/routes/api');

const port = 3000;

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', api);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));});

app.listen(port, function(){
    console.log("Server running on localhost:"+ port);});
