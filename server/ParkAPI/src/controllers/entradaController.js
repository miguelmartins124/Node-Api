'use strict';
const mongoose = require('mongoose')
const ParquesModel = require("../models/parquesModel");
const Entr = mongoose.model('Entrada')

exports.lista_todas_entradas = function (req, res) {
    Entr.find({}, function (err, entrada) {
        if (err)
            res.send(err);
        res.json(entrada);
    });
};

exports.nova_entrada = function (req, res) {
        const novo = new Entr(req.body);
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
// ------------------------------------

exports.saida_matricula = function (req, res) {
    Entr.remove({
        matricula: req.params.matricula
    }, function (err, saida) {
        if (err)
            res.send(err);
        res.json({ message: 'Entrada eliminada!' });
    });
};

// ------------------------------------

exports.obtem_uma_entrada = function (req, res) {
    Entr.findById(req.params.matricula, function (err, entrada) {
        if (err)
            res.send(err);
        res.json(entrada);
    });
};

