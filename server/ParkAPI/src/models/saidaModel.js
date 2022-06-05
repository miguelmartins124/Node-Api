'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saidaSchema = new Schema({
        nParqueSaida: {
            type: Number,
            required: [true, 'Nº do parque do qual saiu o veiculo']
        },
        matriculaSaidas: {
            type: String,
            required: [true,'Matricula carro']
        },
        data: Date,
        Created_date: { type: Date, default: Date.now     }
    },
    {collection: 'SaidaCollection'}   );

const SaidaModel =  mongoose.model('Saida', saidaSchema);
// --------------------------------------------------

module.exports = SaidaModel;