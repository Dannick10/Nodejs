// Carregando modulos
const express = require("express");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");

const app = express();
//const mongoose = require('mongoose)

//config

//boddy parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//handlebars
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", "./views");
//mongoose
 //em breve

//rotas

//outros
const PORT = 8081;
app.listen(PORT, () => {
  console.log("servdidor rodando na porta 8081");
});
