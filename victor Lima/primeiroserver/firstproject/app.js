const express = require("express")
const app = express()
const { engine } = require("express-handlebars")
const bodyParser = require('body-parser')
const Post = require('./models/Posts')

// config 
// template Engine 
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');
//body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//rotas
app.get("/", (req,res) => {
    res.render('home')
})
app.get('/cad', (req,res) => {
    res.render('formulario')
})

app.post('/add', (req,res) => {
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(() => {
        res.redirect('/')
    }).catch((error) => {
        res.send("error: " + error)
    })
})


app.listen(8081, () => {
    console.log("servidor rodando")
})