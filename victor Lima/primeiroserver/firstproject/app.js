const express = require("express")
const app = express()
const Sequelize = require("sequelize")
const { engine } = require("express-handlebars")


// config 
// template Engine 
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');

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
    res.send('Formulário recebido')
})


app.listen(8081, () => {
    console.log("servidor rodando")
})