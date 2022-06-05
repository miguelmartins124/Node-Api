'use strict'
const clienteCtrl = require("../controllers/clienteController");
module.exports = function (app) {
    const clienteCtrl =
        require('../controllers/clienteController');


    app.route('/clientes')
        .get(clienteCtrl.obter_clientes)
        .post(clienteCtrl.novo_cliente)

    app.route('/clientes/obterInfo').post(clienteCtrl.findAvenca);


    app.route('/clientes/:id')
        .post(clienteCtrl.atualizar_cliente)
}