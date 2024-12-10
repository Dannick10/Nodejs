const express = require('express')
const Sequelize = require('sequelize')

const app = express()

const sequelize = new Sequelize('teste','root','M&d04Dezembro',{
    host: "localhost",
    dialect: "mysql"
})

sequelize.authenticate().then(() => { console.log('conectado ao bancod')}).catch((error)=>console.log('error'+ error))

app.get('/',(req,res) => {
    res.send('api')
})

const user= await User.findAll()



app.listen(8081, ()=>{ 
    console.log('servdidor rodando na porta 8081')
})