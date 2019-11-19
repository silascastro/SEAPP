const {tbpedidoexterno} = require(__dirname+'/../../app/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op; 

exports.get = (req, res, next) => {   
    tbpedidoexterno.findAll().then((resp) => {
        res.status(200).send(resp);
    }).catch((e)=> {
        res.status(500).send(e);
    });
}

exports.post = (req, res, next) => {
    tbpedidoexterno.create({
        cod_cliente: req.body.cod_cliente,
        nome_cliente: req.body.nome_cliente,
       // data_hora: req.body.data_hora,
	cod_vendedor: req.body.cod_vendedor,
	nome_vendedor: req.body.nome_vendedor,
        subtotal: req.body.subtotal,
        total: req.body.total
    }).then((resp)=>{
        res.status(201).send(resp);
    }).catch((e) => {
        res.status(500).send(e);
    })
}
