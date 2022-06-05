'use strict';
const parq = require("../controllers/parquesController");
module.exports = function (app) {
    const parq =
        require('../controllers/parquesController');

    // rotas definidas para a API Restful inscricoes

    // -- rota  /inscricao    métodos: GET, POST
    app.route('/pe/parques')
        .get(parq.lista_todos_parques)
        .post(parq.novo_parque);

    app.route('/pe/ativos').get(parq.findParquebyStatus);

    app.route('/pe/update').post(parq.update);

    app.route('/pe/updateparque').post(parq.updateparques);

    app.route('/pe/obterparque').post(parq.findParquebyID);


};