const {tbfuncionario} = require('../../app/models');


exports.get = async(req, res, next) => {
    
    tbfuncionario.findAll().then((resp) => {
        res.status(200).send(resp);
    }).catch((e)=> {
        res.status(500).send(e);
    });

}

exports.getOne = async(req, res, next) => {
    var nome_param = req.params.nome;
    tbfuncionario.findOne({where: {nome: nome_param}}).then(resp => {
        if(resp){
            res.status(200).send(resp);
        }
        res.status(404).send({msg: 'Funcionário não encontrado!'});
    }).catch((e)=>{
        res.status(500).send(e);
    })
}
