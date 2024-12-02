// Carregando modulos
const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const admin = require("./routes/admin");
const path = require("path");
const { mongo } = require("mongoose");
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');

//config

//sessão
app.use(session({
  secret: "cursodeNode",
  resave: true,
  saveUninitialized: true
}));

app.use(flash());

///middleware

app.use((req,res,next) => {
  res.locals.sucess_msg = req.flash('sucess_msg');
  res.locals.error_msg = req.flash('error_msg');
  next()
});
-
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
