const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.send("Seja bem-vindo ao meu app!");
});

app.get("/sobre", (req, res) => {
    res.send({name: "daniel", age: "24", profission: "develop"});
});

app.get("/blog", (req, res) => {
    res.send("blog");
});

app.get('/ola/:nome/:idade', (req, res) => {
    res.send(`<h1>Olá ${req.params.nome} </h1>, <h2>proximo ano voçê faz ${aumentaridade(req.params.idade)}</h2> <p>Busque o oftamologista</p>`)
})

function aumentaridade(idade) {
    let num = parseInt(idade)
    return num +10
}

app.listen(8081, () => {
    console.log("servidor Rodando na URL http://localhost:8081")
});
