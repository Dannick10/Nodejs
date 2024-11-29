// Carregando modulos
const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const admin = require("./routes/admin");
const path = require("path");
const { mongo } = require("mongoose");
const mongoose = require('mongoose')

//config

//boddy parser
app.use(express.json())    // para ler json
app.use(express.urlencoded({ extended: true}))

//handlebars
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", "./views");
//mongoose
 mongoose.connect('mongodb://localhost/blogapp')
 .then(() => {
  console.log('conectado ao mongodb')
 }).catch((error) => {
  console.lodg('erro ao conectar' + error)
 } )
//public 
app.use(express.static(path.join(__dirname,"public")))
//rotas
app.use('/admin', admin)

//outros
const PORT = 8081;
app.listen(PORT, () => {
  console.log("servdidor rodando na porta 8081");
});
