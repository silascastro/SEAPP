const {tbproduto} = require('../../app/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op; 

exports.get = async(req, res, next) => {  
    tbproduto.findAll({order:[['descricao','ASC']]}).then((resp) => {
        res.status(200).send(resp);
    }).catch((e)=> {
        res.status(500).send(e);
    });
}

exports.getOneProductById = async(req, res, next) => {
    var id = req.params.id;
    tbproduto.findOne({
        where: {cod_produto: id},
        //include: [tbcontasreceber],
        //attributes:['tbcontasreceber.valor',[Sequelize.fn('sum',Sequelize.col('tbcontasreceber.valor')),'saldo_devedor']],
       // group: ['tbcontasreceber.cod_cliente'],
    }).then(resp => {
        if(resp){
            res.status(200).send(resp);
        }
        res.status(404).send({msg: 'produto não encontrado!'});
    }).catch((e)=>{
        res.status(500).send(e);
    });
}

// where: {nome: {[Op.like]: nome_param+'%'}}

exports.getOneProductByName = async(req, res, next) => {
    var nome_param = req.params.nome_param;
    tbproduto.findAll({
        where: {descricao: {[Op.like]: nome_param+'%'}},
    }).then(resp => {
        if(resp){
            res.status(200).send(resp);
        }
        res.status(404).send({msg: 'produto não encontrado!'});
    }).catch((e)=>{
        res.status(500).send(e);
    });
}