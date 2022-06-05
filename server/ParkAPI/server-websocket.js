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
const PORT = 5010
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

const EntradaModel =  require('./src/models/entradaModel');
const EntradaRoutes =  require('./src/routes/entradaRoutes');
const mongoose = require("mongoose");
const ParquesModel =  require('./src/models/parquesModel');
const ParquesRoutes =  require('./src/routes/parquesRoutes');
const SaidaModel =  require('./src/models/saidaModel');
const SaidaRoutes =  require('./src/routes/saidaRoutes');
const PrecosModel =  require('./src/models/precosModel');
const PrecosRoutes =  require('./src/routes/precosRoutes');
const mongo = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectId;
const assert = require("assert");
const url = 'mongodb://127.0.0.1/tsd08_app';

// registar as rotas
EntradaRoutes(app);
ParquesRoutes(app);
SaidaRoutes(app);
PrecosRoutes(app);


/**
 * HTTP Server
 */
app.get('/eecs', (req, res) =>
    res.sendFile(path.join(__dirname, 'public', 'client-websocket.html')));

app.get('/pe', (req, res) =>
    res.sendFile(path.join(__dirname, 'public', 'client-websocket-parques.html')));

app.get('/tabelas', (req, res) =>
    res.sendFile(path.join(__dirname, 'public', 'Tabelas.html')));

app.get('/precos', (req, res) =>
    res.sendFile(path.join(__dirname, 'public', 'client-Precos.html')));

app.post('/precario/obterPrecos', function (req, res){
    let newPrecos = new PrecosModel({
        Tempo: req.body.Tempo,
        precoMinutos: req.body.precoMinutos
    });

    newPrecos.save();

    res.redirect('/precos')
})

app.post('/pe', function (req, res){
    let newParque = new ParquesModel({
        Numero_parque: req.body.Numero_parque,
        Numero_lugares_normais: req.body.Numero_lugares_normais,
        Numero_lugares_cadeira: req.body.Numero_lugares_cadeira,
        Total_lugares: req.body.Total_lugares,
        Lugares_disponiveis: req.body.Lugares_disponiveis,
        status: req.body.status
    });

    newParque.save();

    res.redirect('/pe')
})

app.post('/eecs', function (req, res){
    let newEntrada = new EntradaModel({
        Nparque: req.body.NparqueE,
        matricula: req.body.matriculaE
    });

    newEntrada.save();

    ParquesModel.findOneAndUpdate({Numero_parque:req.body.NparqueE}, { $inc: {Lugares_disponiveis: -1} }, (error, data) =>{

    });

    res.redirect('/eecs')
})

app.post('/eecs/saida', function (req, res){

    let newSaida = new SaidaModel({
        nParqueSaida: req.body.nParqueSaida,
        matriculaS: req.body.matriculaS
    });

    newSaida.save();

    res.redirect('/eecs')
})

app.post('/eecs/apagar',  (req, res) => {

    EntradaModel.findOne({matricula: req.body.matriculaS}, function (err,obj) {
        if(obj){
            const matriculaS = req.body.matriculaS;
            EntradaModel.deleteOne({"matricula": matriculaS}, function (err, result) {
                assert.equal(null, err)
                console.log("Item apagado")
            })

            let newSaida = new SaidaModel({
                nParqueSaida: req.body.nParqueSaida,
                matriculaSaidas: req.body.matriculaS
            });
            newSaida.save();

            ParquesModel.findOneAndUpdate({Numero_parque:req.body.nParqueSaida}, { $inc: {Lugares_disponiveis: 1} }, (error, data) =>{

            });

        } else {
            console.log("Erro! Não é possível inserir remover um veículo que não deu entrada!")
        }
    })

    res.redirect('/eecs')

});

const httpServer = app.listen(5010, 'localhost', () => {
    console.log('HTTP server is listening on localhost:5010');
});

2
/**
 * WebSocket Server
 */
const wsServer = new Server({port:5085}); // Starts the WebSocket server on port 8085
console.log('WebSocket server is listening on localhost:5085');

wsServer.on('connection',
    wsClient => {
        wsClient.send('Mensagem enviada pelo servidor WebSocket...');
        wsClient.onerror = (error) =>   console.log(`The server received: ${error['code']}`);
    }
);

app.listen(PORT, () =>
    console.log(`servidor a executar em http://localhost:${PORT}`));





    

    

