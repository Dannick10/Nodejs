const express = require("express")
const app = express()
const handlebars = require('express-handlebars')
const Sequelize = require("sequelize")


// config 
// template Engine 
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
// conexão com o banco de dados Mysql
const sequelize = new Sequelize('teste', 'root', '', {
    host: "localhost",
    dialect: 'mysql'
})


app.listen(8081)