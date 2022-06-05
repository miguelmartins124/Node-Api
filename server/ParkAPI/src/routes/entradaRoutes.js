'use strict';
const entr = require("../controllers/entradaController");
module.exports = function (app) {
    const entr =
        require('../controllers/entradaController');

    // rotas definidas para a API Restful inscricoes

    // -- rota  /inscricao    métodos: GET, POST
    app.route('/eecs/entrada')
        .get(entr.lista_todas_entradas)
        .post(entr.nova_entrada);

    // app.get('/inscricao', insc.lista_todas_inscricoes)
    // app.post('/inscricao', insc.nova_inscricao )

    app.route('/eecs/:matricula')
        .delete(entr.saida_matricula)


};