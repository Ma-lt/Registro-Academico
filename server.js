//constantes necesarias para el servidor
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

require('./server/models/db');//modelos de la BD

const api = require('./server/routes/api');//api

const port = 3000;

const app = express();//inicia express

//codigo

//necesario para el uso de express y bodyParser
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', api);//especifica que todos los links /api llaman al api

//especufica que todos los links que no tienen /api son de la interfaz
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));});

//deja la aplicacion sirviendo y esperando solicitudes
app.listen(port, function(){
    console.log("Server running on localhost:"+ port);});
