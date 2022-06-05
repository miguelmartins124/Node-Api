'use strict';
module.exports = function (app) {
    const precos =
        require('../controllers/precosController');

    // rotas definidas para a API Restful inscricoes

    // -- rota  /inscricao    métodos: GET, POST
    app.route('/precario/obterPrecos')
        .get(precos.precario_parque)
        .post(precos.novosPrecos)


};