"use strict";

const http = require('http');
const debug = require('debug')('nodestr:server');
const express = require('express');

const app = express();
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);
const router = express.Router();

let route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "node store",
        version: "0.0.1"
    });
});

app.use('/', route);

server.listen(port)
console.log("APi rodando porta")

function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
  }