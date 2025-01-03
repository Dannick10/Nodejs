const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {eadmin} = require("../helpers/eadmin");
require("../models/Categoria");
const Categorias = mongoose.model("categorias");
require("../models/Postagens")
const Postagens = mongoose.model("postagens")
router.get("/", (req, res) => {
  res.render("admin/index");
});


router.get("/categorias", eadmin, (req, res) => {
  Categorias.find()
    .lean()
    .sort({ date: "desc" })
    .then((categoria) => {
      res.render("admin/categorias", { categorias: categoria });
    })
    .catch((err) => {
      req.flash("error_msg", err);
      res.redirect("/admin");
    });
});

router.get("/categorias/edit/:id", eadmin, (req, res) => {
  Categorias.findOne({ _id: req.params.id })
    .lean()
    .then((categoria) => {
      res.render("admin/editcategorias", { categoria: categoria });
    })
    .catch((err) => {
      req.flash("error_msg", "está categoria não existe");
      res.redirect("/admin");
    });
});

router.post("/categorias/edit", eadmin, (req, res) => {
  Categorias.findOne({ _id: req.body.id })
    .then((categoria) => {
      if (!categoria) {
        req.flash("error_msg", "Categoria não encontrada.");
        return res.redirect("/admin/categorias");
      }
      

      categoria.name = req.body.name;
      categoria.slug = req.body.slug;


      categoria
        .save()
        .then(() => {
          req.flash("success_msg", "Categoria editada com sucesso.");
          res.redirect("/admin/categorias");
        })
        .catch((err) => {
          console.error(err);
          req.flash("error_msg", "Houve um erro ao salvar a categoria.");
          res.redirect("/admin/categorias");
        });
    })
    .catch((err) => {
      console.error(err);
      req.flash("error_msg", "Houve um erro ao editar a categoria.");
      res.redirect("/admin/categorias");
    });
});

router.post("/categorias/deletar", eadmin, (req, res) => {
    Categorias.deleteOne({_id: req.body.id})
    .then(() => {
      req.flash("sucess_msg", "categoria deletada com sucesso")
      res.redirect("/admin/categorias")
    })
    .catch((err) =>{ 
      req.flash("error_msg", "houve um erro ao deletar a categoria")
      res.redirect("/admin/categorias")
    })
})

router.get("/categorias/add", eadmin, (req, res) => {
  res.render("admin/addcategorias");
});

router.post("/categorias/nova", (req, res) => {
  let errors = [];

  if (
    !req.body.name ||
    typeof req.body.name == undefined ||
    req.body.name == null
  ) {
    errors.push({ text: "Nome invalido" });
  }

  if (req.body.name.length < 2) {
    errors.push({ text: "Nome nao pode ser menor que 2" });
  }

  if (
    !req.body.slug ||
    typeof req.body.slug == undefined ||
    req.body.slug == null
  ) {
    errors.push({ text: "Slug invalido" });
  }

  if (errors.length > 0) {
    res.render("admin/addcategorias", eadmin, { errors: errors });
  } else {
    const novaCategoria = {
      name: req.body.name,
      slug: req.body.slug,
    };

    new Categorias(novaCategoria)
      .save()
      .then(() => {
        req.flash("sucess_msg", "Categoria criada com sucesso");
        res.redirect("/admin/categorias");
      })
      .catch((error) => {
        req.flash("error_msg", "Erro ao salvar categoria");
        res.redirect("/admin");
      });
  }
});

router.get("/postagens", eadmin, (req, res) => {
  Postagens.find().lean().populate("categoria").sort({data: 'desc'}).then((postagem) => {
    res.render("admin/postagens", {postagens: postagem})
  }).catch((err) => {
    req.flash("error_msg", "houve um erro ao listar as postagens")
    res.redirect("/admin")
  })
})

router.get("/postagens/add", (req,res) => {
  Categorias.find().lean().then((categorias) => {
    console.log(categorias)
    res.render("admin/addpostagens", {categoria: categorias})
  }) .catch((err) => {
    req.flash("error_msg", "Erro ao add categoria");
    res.redirect("admin")
  })
})

router.post("/postagens/nova", eadmin, (req,res) => {
   let erros = []

   if(req.body.categoria == "0") {
    erros.push({text: "Categoria inválida, registre uma cateogira"})
   }

   if(!req.body.descricao) {
    error.push({text: "é necessario adicinar uma descrição"})
   }

   if(!req.body.conteudo) {
    error.push({text: "é necessario adicionar conteúdo"})
   }

   if(!req.body.titulo) {
    error.push({text: "é necessario adicionar titulo"})
   }

   if(erros.length > 0) {
    res.render("admin/addpostagens", {text: erros})
   } else {
    const novaPostagem = {
       titulo: req.body.titulo,
       descricao: req.body.descricao,
       conteudo: req.body.conteudo,
       categoria: req.body.categoria,
       slug: req.body.slug 
    }

    new Postagens(novaPostagem).save().then(() => {
      req.flash("sucess_msg", "postagens criada com sucesso")
      res.redirect("/admin/postagens")
      console.log(novaPostagem)
    }).catch((err) => {
      req.flash("error_msg", "Houve um erro durante o salvamento da postagem")
      res.redirect("/admin/postagens")
      console.log(err)
    })
   }

  })


router.post("/postagens/deletar", eadmin, (req,res) => {
    Postagens.deleteOne({_id: req.body.id}).then((postagem) => {
      req.flash("sucess_msg", "postagem deletada com sucesso")
      res.redirect("/admin/postagens")
    }).catch((err) => {
      req.flash("error_msg", "houve um erro ao deletar a postagem")
      res.redirect("/admin/postagens")
    })

  })


module.exports = router;
