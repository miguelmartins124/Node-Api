'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const precosSchema = new Schema({
        Tempo: {
            type: String,
            required: [true,'Tempo hora/minutos']
        },
        precoMinutos: {
            type: String,
            required: [true,'Preço por minutos']
        },
        data: Date,
        Created_date: { type: Date, default: Date.now     }
    },
    {collection: 'PrecosCollection'}   );

const PrecosModel =  mongoose.model('Precos', precosSchema);
// --------------------------------------------------

module.exports = PrecosModel;