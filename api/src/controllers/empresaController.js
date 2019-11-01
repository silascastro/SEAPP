const {tbempresa} = require('../../app/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op; 

exports.get = async(req, res, next) => {  
    tbempresa.findAll({order:[['nome_fantasia','ASC']]}).then((resp) => {
        res.status(200).send(resp);
    }).catch((e)=> {
        res.status(500).send(e);
    });
}

exports.getOneEmpresaById = async(req, res, next) => {
    var id = req.params.id;
    tbempresa.findOne({
        where: {id_empresa: id},
    }).then(resp => {
        if(resp){
            res.status(200).send(resp);
        }
        res.status(404).send({msg: 'empresa não encontrada!'});
    }).catch((e)=>{
        res.status(500).send(e);
    });
}

// where: {nome: {[Op.like]: nome_param+'%'}}

exports.getOneEmpresaByName = async(req, res, next) => {
    var nome_param = req.params.nome_param;
    tbempresa.findAll({
        where: {nome_fantasia: {[Op.like]: nome_param+'%'}},
    }).then(resp => {
        if(resp){
            res.status(200).send(resp);
        }
        res.status(404).send({msg: 'empresa não encontrada!'});
    }).catch((e)=>{
        res.status(500).send(e);
    });
}