const {tbpedidoexternoitens} = require('../../app/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op; 

exports.get = async(req, res, next) => {   
    tbpedidoexternoitens.findAll().then((resp) => {
        res.status(200).send(resp);
    }).catch((e)=> {
        res.status(500).send(e);
    });
}

exports.post = async(req, res, next) => {
    tbpedidoexternoitens.create({
        numero_pedido: req.body.numero_pedido,
        id_produto: req.body.id_produto,
        cod_produto: req.body.cod_produto,
	    descricao: req.body.descricao,
	    marca: req.body.marca,
        tipo: req.body.tipo,
        qtd_pedida: req.body.qtd_pedida,
        preco_unitario: req.body.preco_unitario,
        preco_total: req.body.preco_total,
    }).then((resp)=>{
        res.status(201).send(resp);
    }).catch((e) => {
        res.status(500).send(e);
    })
}
