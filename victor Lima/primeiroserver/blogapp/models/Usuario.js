const mongoose = require("mongoose")
const Schema = mongoose.Schema


const Usuario = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    eadmin: {
        type: String,
        default: 0,
        required: true
    },
    senha: {
        type: String,
        required: true
    }
})

mongoose.model("usuarios", Usuario)