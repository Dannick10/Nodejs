const express = require("express")

const app = express()

app.get("/", (req,res) => {
    res.send("BIRL")
})

app.listen(8081)