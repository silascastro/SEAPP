const {tbfuncionario} = require('../../app/models');
const {mensagens} = require('../../app/models');

exports.get = (req, res, next) => {
    
    mensagens.findAll().then(resp => {
        console.log(resp);
        res.status(200).send(resp);
    });
}