import mongoose, { mongo } from "mongoose"


// configurando o mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/aprendendo',{
    useNewUrlParser: true 
})
.then(() => {
    console.log('deu certo')
})
.catch((error) => {
    console.log('deu error' + error)
})

//model - usuario 
//definido o model
    const UsuarioSchema = new mongoose.Schema({
        nome: {
            type: String,
            required: true 
        },
        sobrenome: {
            type: String, 
            required: true 
        },
        email: {
            type: String,
            required: true 
        },
        idade: {
            type: Number,
            required: true 
        },
        pais: {
            type: String,
        }
    })

    // criar collection 
    mongoose.model('usuarios', UsuarioSchema)

    //definir usuario 
    const novoUsuario = mongoose.model('usuarios')

    new novoUsuario({
        nome: "naruto",
        sobrenome: "uzumaki",
        email: "narutinhodahinata@gmail.com",
        idade: 15,
        pais: "konoha"
    }).save().then(() => {
        console.log('usuario cadastrado')
    }).catch((err) => {
        console.log('houve um error ao registrar: ' + err)
    })
