'use strict';
const mongoose = require('mongoose')
const Parq = mongoose.model('Parques')

exports.lista_todos_parques = function (req, res) {
    Parq.find({}, function (err, parques) {
        if (err)
            res.send(err);
        res.json(parques);

        
    });
};

exports.novo_parque = function (req, res) {
    const novo = new Parq(req.body);
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


exports.findParquebyStatus = function (req, res,next) {
    Parq.find({status:1}, function(err, docs){
        console.log(docs);

        if(err){
            res.send(err);
        }

        res.json(docs)

    });
};

exports.update = function (req, res,next) {
    Parq.findOneAndUpdate({Numero_parque:req.body.Numero_parque_statusUpdate}, { status:req.body.status_statusUpdate }, (error, data) =>{
        res.redirect('/pe')



    });
    
};

exports.updateparques = function (req, res,next) {
    Parq.findOneAndUpdate({Numero_parque:req.body.Numero_parque_updateParque}, { Numero_lugares_normais:req.body.Numero_lugares_normais_updateParque, Numero_lugares_cadeira:req.body.Numero_lugares_cadeira_updateParque,Total_lugares:req.body.Total_lugares_updateParque, Lugares_disponiveis: req.body.Lugares_disponiveis_updateParque  }, (error, data) =>{
        if(error){
            res.send(error);
        }else{
            res.json(data)
        }

    });
    
};

exports.findParquebyID = function (req, res,next) {
    Parq.find({Numero_parque:req.body.Numero_parque_find}, function(err, docs){
        console.log(docs);

        if(err){
            res.send(err);
        }

        res.json(docs)

    });
};


