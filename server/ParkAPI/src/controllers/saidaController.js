'use strict';
const mongoose = require('mongoose')
const Saida = mongoose.model('Saida')

exports.lista_todas_saidas = function (req, res) {
    Saida.find({}, function (err, saida) {
        if (err)
            res.send(err);
        res.json(saida);
    });
};

exports.nova_saida = function (req, res) {
    const novo = new Saida(req.body);
    novo.save()
        .then(result => {
            res.status(201).jsonp(novo)
        })
        .catch(err => {
            res.status(500).jsonp({
                error: {message: err.message}
            })
        })
};


exports.saida_matricula = function (req, res) {
    Saida.remove({
        nParqueSaida: req.body.nParqueSaida,
        matricula: req.params.matriculaS
    }, function (err, saida) {
        if (err)
            res.send(err);
        res.json({ message: 'matricula eliminada' });
    });
};