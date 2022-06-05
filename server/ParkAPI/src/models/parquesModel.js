'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parquesSchema = new Schema({
        Numero_parque: {
            type: Number,
            required: [true,'Numero do Parque']
        },
        Numero_lugares_normais: {
            type: Number,
            required: [true,'Numero de lugares']
        },
        Numero_lugares_cadeira: {
            type: Number,
            required: [true,'Numero de lugares para pessoas com mobilidade reduzida']
        },
        Total_lugares: {
            type: Number,
            required: [true,'Número total de lugares do parque']
        },
        Lugares_disponiveis: {
            type: Number,
            required: [true,'Número de lugares disponiveis']
        },
        status: {
            type: Number,
            required: [true,'status']
        },
        data: Date,
        Created_date: {
            type: Date,
            default: Date.now
        }
        },
        {collection: 'ParquesCollection'}   );

const ParquesModel =  mongoose.model('Parques', parquesSchema);

module.exports = ParquesModel;

