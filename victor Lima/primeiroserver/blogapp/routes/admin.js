const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Categoria");
const Categorias = mongoose.model("categorias");
router.get("/", (req, res) => {
  res.render("admin/index");
});

router.get("/posts", (req, res) => {
  res.send("posts");
});

router.get("/categorias", (req, res) => {
  res.render("admin/categorias");
});

router.get("/categorias/add", (req, res) => {
  res.render("admin/addcategorias");
});

router.post("/categorias/nova", (req, res) => {
  let errors = [];

  if (!req.body.name || typeof req.body.name == undefined || req.body.name == null) {
    errors.push({ text: "Nome invalido" });
  } 
  
  if (req.body.name.length < 2) {
    errors.push({ text: "Nome nao pode ser menor que 2" });
  }

  if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
    errors.push({ text: "Slug invalido" });
  }

  if (errors.length > 0) {
    res.render("admin/addcategorias", { errors: errors });
  } else {
    const novaCategoria = {
      nome: req.body.name,
      slug: req.body.slug,
    };

    new Categorias(novaCategoria)
      .save()
      .then(() => {
        req.flash('sucess_msg', 'Categoria criada com sucesso');
        res.redirect('/admin/categorias');
      })
      .catch((error) => {
        req.flash('error_msg', 'Erro ao salvar categoria');
        res.redirect("/admin");
      });
  }
});

module.exports = router;
