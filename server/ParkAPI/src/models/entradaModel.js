'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entradaSchema = new Schema({
        Nparque: {
            type: Number,
            required: [true,'Numero do Parque']
        },
        matricula: {
            type: String,
            unique: true,
            required: [true,'Matricula do carro']
        },
        data: Date,
        Created_date: { type: Date, default: Date.now     }
    },
    {collection: 'EntradaCollection'}   );

const EntradaModel =  mongoose.model('Entrada', entradaSchema);
// --------------------------------------------------

module.exports = EntradaModel;