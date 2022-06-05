const express =require("express");
const path = require("path");
const cors = require('cors')
const {Server} = require("ws");

require('dotenv').config(); // leitura ficheiro .env (npm i dotenv --save)
// console.log(process.env) // listar environment

/*if (!process.env.PORT) {
    throw new Error('indique a porta onde iniciar o servidor HTTP: variável de ambiente PORT');
}
const PORT = process.env.PORT */
const PORT = 5020
const BD =  require('./src/config/configBDMongo');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
    next();
});

const ClienteModel =  require('./src/models/clienteModel');
const ClienteRoutes =  require('./src/routes/clienteRoutes');
const mongoose = require("mongoose");

const mongo = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectId;
const assert = require("assert");
const url = 'mongodb://127.0.0.1/tsd08_app';

// registar as rotas
ClienteRoutes(app);



/**
 * HTTP Server
 */
app.get('/PClientes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public', 'client-websocket-clientes.html')));

app.get('/tabelaClientes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public', 'TabelaClientes.html')));

app.get('/clientes/obterInfo')

app.post('/PClientes', (req, res) => {
    let newCliente = new ClienteModel({
        nome: req.body.nome,
        avenca: req.body.avenca,
        matriculaVeiculoPessoal: req.body.matriculaVeiculoPessoal,
        email: req.body.email
    });
    newCliente.save();
    res.redirect('/PClientes')

});

const httpServer = app.listen(5020, 'localhost', () => {
    console.log('HTTP server is listening on localhost:5020');
});


/**
 * WebSocket Server
 */
const wsServer = new Server({port:5095}); // Starts the WebSocket server on port 8085
console.log('WebSocket server is listening on localhost:5095');

wsServer.on('connection',
    wsClient => {
        wsClient.send('Mensagem enviada pelo servidor WebSocket...');
        wsClient.onerror = (error) =>   console.log(`The server received: ${error['code']}`);
    }
);

app.listen(PORT, () =>
    console.log(`servidor a executar em http://localhost:${PORT}`));