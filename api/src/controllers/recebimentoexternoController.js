const {tbrecebimentoexterno} = require(__dirname+'/../../app/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op; 

exports.get = (req, res, next) => {   
    tbrecebimentoexterno.findAll().then((resp) => {
        res.status(200).send(resp);
    }).catch((e)=> {
        res.status(500).send(e);
    });
}

exports.post = (req, res, next) => {
    tbrecebimentoexterno.create({
        sequencia: req.body.sequencia,
        cod_vendedor: req.body.cod_vendedor,
        nome_vendedor: req.body.nome_vendedor,
	codigo_celular: req.body.cod_celular,
	cod_cliente: req.body.cod_cliente,
        nome_cliente: req.body.nome_cliente,
        numero_documento: req.body.numero_documento,
        valor_documento: req.body.valor_documento,
        valor_recebido: req.body.valor_recebido,
        data_vencimento: req.body.data_vencimento
    }).then((resp)=>{
        res.status(201).send(resp);
    }).catch((e) => {
        res.status(500).send(e);
    })
}
