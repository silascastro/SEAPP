const {tbcliente} = require('../../app/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op; 

exports.get = async(req, res, next) => {
    
    tbcliente.findAll().then((resp) => {
        res.status(200).send(resp);
    }).catch((e)=> {
        res.status(500).send(e);
    });

}

exports.getOnClienteById = async(req, res, next) => {
    var id = req.params.id;
    tbcliente.findOne({where: {cod_cliente: id}}).then(resp => {
        if(resp){
            res.status(200).send(resp);
        }
        res.status(404).send({msg: 'Cliente não encontrado!'});
    }).catch((e)=>{
        res.status(500).send(e);
    });
}



exports.getOneClienteByName = async(req, res, next) => {
    var nome_param = req.params.nome;

    tbcliente.findAll({where: {nome: {[Op.like]: nome_param+'%'}}}).then(resp => {
        if(resp){
            res.status(200).send(resp);
        }
        res.status(404).send({msg: 'Cliente não encontrado!'});
    }).catch((e)=>{
        res.status(500).send(e);
    });
}