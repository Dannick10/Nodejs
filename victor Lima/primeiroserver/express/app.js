const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.send("Seja bem-vindo ao meu app!");
});

app.get("/sobre", (req, res) => {
    res.send({name: "daniel", age: "24", profission: "develop"});
});

app.get("/blog", (req, res) => {
    res.send("blog")
})

app.listen(8081, () => {
    console.log("servidor Rodando na URL http://localhost:8081")
});
