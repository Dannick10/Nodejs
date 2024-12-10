const mongoose = require("mongoose")
const Schema = require.Schema

const Postagens = new Schema({
    titulo: {
        type: String,
        required: true 
    },
    slug: {
        type: String,
        required: true 
    },
    descricao: {
        type: String,
        required: true 
    },
    conteudo: {
        type: String,
        required: True 
    },
    categoria: {
        type: Schema.Types.ObjectID,
        ref: "categorias",
        required: true
    },
    data: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("postagens", Postagens)