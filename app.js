const bodyParser = require('body-parser')
const socketio = require('socket.io');
const nunjucks = require("nunjucks");
const express = require("express");
const routes = require('./routes');
const morgan = require("morgan");

const app = express(); // crea una instancia de una aplicación de express

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Configurando Nunjucks
app.set("view engine", "html"); // hace que res.render funcione con archivos html
app.engine("html", nunjucks.render); // cuando le den archivos html a res.render, va a usar nunjucks
nunjucks.configure("views"); // apunta a nunjucks al directorio correcto para los templates

app.use(morgan("tiny"));

app.use(express.static('./public'))

app.use( '/', routes(io) );

var server = app.listen(3000);
var io = socketio.listen(server);

app.listen(3000, function () {
  console.log("Estas escuhando en el puerto 3000");
});