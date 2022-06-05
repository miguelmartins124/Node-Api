'use strict';
const mongoose = require('mongoose')
const Precos = mongoose.model('Precos')

exports.precario_parque = function (req, res) {
    Precos.find({}, function (err, precos) {
        if (err)
            res.send(err);
        res.json(precos);

    });
};

exports.novosPrecos = function (req, res) {
    const novoP = new Precos(req.body);
    novoP.save()
        .then(result => {
            res.status(201).jsonp(novoP)
        })
        .catch(err => {
            res.status(500).jsonp({
                error: {message: err.message}
            })
        })

};