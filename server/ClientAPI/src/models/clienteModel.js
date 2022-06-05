'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clienteSchema = new Schema({
        nome: {
            type: String,
            required: [true, 'nome do utilizador']
        },
        avenca : {
            type: Number,
            required: [true, 'Avenca valida ou invalida - 1-Válida 0-Inválida']
        },
        matriculaVeiculoPessoal: {
            type: String,
            unique: true,
            required: [true, 'Matricula do veiculo do cliente']
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        data: Date,
        Created_date: { type: Date, default: Date.now     }
    },
    {collection: `ClienteCollection`}  );

const ClienteModel =  mongoose.model('Cliente', clienteSchema);
// --------------------------------------------------

module.exports = ClienteModel;