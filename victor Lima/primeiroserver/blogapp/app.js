// Carregando modulos
const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const admin = require("./routes/admin");
const path = require("path");
const { mongo } = require("mongoose");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
require("./models/Postagens");
const Postagem = mongoose.model("postagens");
require("./models/Categoria")
const Categoria = mongoose.model("categorias")
const usuarios = require("./routes/usuario")
const passport = require("passport")
require("./config/auth")(passport)
//config

//sessão
app.use(
  session({
    secret: "cursodeNode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize())
app.use(passport.session())
app.use(flash());

///middleware

app.use((req, res, next) => {
  res.locals.sucess_msg = req.flash("sucess_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.erros = req.flash("error");
  res.locals.user = req.user || null;
  next();
});
-(
  //boddy parser
  app.use(express.json())
); // para ler json
app.use(express.urlencoded({ extended: true }));

//handlebars
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", "./views");
//mongoose
mongoose
.connect("mongodb://localhost/blogapp")
.then(() => {
  console.log("conectado ao mongodb");
})
.catch((error) => {
  console.log("erro ao conectar" + error);
});
//public
app.use(express.static(path.join(__dirname, "public")));

//rotas

app.get("/", (req, res) => {
  Postagem.find()
    .lean()
    .populate("categoria")
    .sort({ data: "desc" })
    .then((postagens) => {
      res.render("index", { postagens: postagens });
    })
    .catch((err) => {
      req.flash("error_msg", "Houve um erro interno");
      res.redirect("/404");
    });
});

app.get("/postagem/:slug", (req, res) => {

  console.log(req.params.slug)

   Postagem.find({slug: req.params.slug}).lean().then((postagem) => {
        if(postagem) {
          res.render("postagem/index", {postagem})
        } else {
          req.flash("error_msg", "Esta postagem não existe"); 
          req.redirect("/")
        }
   }).catch((err) => {
      req.flash("error_msg", "Houve um erro interno");
      res.redirect("/")
   })
})

app.get("/categorias/index", (req, res) => {
    Categoria.find().lean().populate().then(
      (categorias) => {
      res.render("categorias/index", {categorias: categorias})
      }).catch((err) => {
        req.flash("error_msg", "Houve um erro interno ao listar as categorias")
        res.redirect("/")
      })
})


app.get("/404", (req, res) => {
  res.send("Erro 404");
})

app.use("/admin", admin);
app.use("/usuarios", usuarios);
//outros
const PORT = 8081;
app.listen(PORT, () => {
  console.log("servdidor rodando na porta 8081");
});
