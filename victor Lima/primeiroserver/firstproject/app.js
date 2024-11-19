const express = require("express")
const app = express()
const Sequelize = require("sequelize")
const { engine } = require("express-handlebars")
const bodyParser = require('body-parser')


// config 
// template Engine 
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');
//body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
// conexão com o banco de dados Mysql
const sequelize = new Sequelize('teste', 'root', '', {
    host: "localhost",
    dialect: 'mysql'
})

//rotas
app.get('/cad', (req,res) => {
    res.render('formulario')
})

app.post('/add', (req,res) => {
    res.send(`texto: ${req.body.titulo}  Conteudo: ${req.body.conteudo}`)
})


app.listen(8081, () => {
    console.log("servidor rodando")
})