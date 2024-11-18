"use strict";

const http = require('http');
const debug = require('debug')('nodestr:server');
const express = require('express');
const { type } = require('os');

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
server.on('error', onerror)
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

  function onError(error) {
    if( error.syscall !== 'listen') {
        throw error;
    };

    const bind = typeof port === 'string' ?
    'Pipe ' + port : 
    'Port ' + port; 

    switch(error.code) {
        case 'EACCES' :
            console.error(bind + 'require elevated previlegios');
            process.exit(1);
            break;
        case 'EADDRINUSE' :
            console.error(bind + 'is already use');
            process.exit(1);
            break;
        default: 
        throw error;
    }
  }