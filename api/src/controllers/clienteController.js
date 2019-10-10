const {tbcliente} = require('../../app/models');


exports.get = async(req, res, next) => {
    
    tbcliente.findAll().then((resp) => {
        res.status(200).send(resp);
    }).catch((e)=> {
        res.status(500).send(e);
    });

}

exports.getOneClienteByName = async(req, res, next) => {
    var nome_param = req.params.nome;

    tbcliente.findOne({where: {nome: nome_param}}).then(resp => {
        if(resp){
            res.status(200).send(resp);
        }
        res.status(404).send({msg: 'Funcionário não encontrado!'});
    }).catch((e)=>{
        res.status(500).send(e);
    });
}