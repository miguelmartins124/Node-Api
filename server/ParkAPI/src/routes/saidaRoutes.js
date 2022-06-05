'use strict';
const saida = require("../controllers/saidaController");
module.exports = function (app) {
    const saida =
        require('../controllers/saidaController');

    // rotas definidas para a API Restful inscricoes

    // -- rota  /inscricao    métodos: GET, POST
    app.route('/eecs/saida')
        .get(saida.lista_todas_saidas)
        .post(saida.nova_saida)

};