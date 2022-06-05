'use strict';

const mongoose = require('mongoose')
const Cliente = mongoose.model('Cliente');

exports.obter_clientes = function (req, res) {
    Cliente.find({}, function (err, clientes) {
        if (err)
            res.send(err);
        res.json(clientes);
    });
};

exports.novo_cliente = function (req, res) {
    const novoC = new Cliente(req.body);
    novoC.save()
    res.redirect('/PClientes')
        .then(result => {
            res.status(201).jsonp(novoC)
        })
        .catch(err => {
            res.status(500).jsonp({
                error: {message: err.message}
            })
        })
};

exports.atualizar_cliente = function (req, res) {
    Cliente.findOneAndUpdate({ _id: req.params.id },
        req.body, { new: true }, function (err, cliente) {
        res.redirect('/PClientes')

        });
};

exports.findAvenca = function (req, res,next) {
    Cliente.find({matriculaVeiculoPessoal: req.body.matriculaAvenca}, 'nome avenca matriculaVeiculoPessoal', function(err, docs){
        console.log(docs);

        if(err){
            res.send(err);
        }

        res.json(docs)

    });
};