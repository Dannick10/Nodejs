const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Categoria')
const Categorias = mongoose.model('categorias')
router.get('/', (req,res) => {
    res.render('admin/index')
})

router.get('/posts', (req,res) => {
    res.send('posts')
})

router.get('/categorias', (req,res) => {
    res.render('admin/categorias')
})

router.get('/categorias/add', (req,res) => {
    res.render('admin/addcategorias')
})

router.post("/categorias/nova", (req,res) => {
    const novaCategoria = {
        name: req.body.name,
        slug: req.body.slug
    }

    console.log(novaCategoria)

    new Categorias(novaCategoria).save()
    .then(()=> {
        console.log('categoria salva')
    })
    .catch((error) => {
        console.log('error ao salvar categoria' + error)
    })
})

module.exports = router