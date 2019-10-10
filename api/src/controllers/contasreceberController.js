const {tbcontasreceber} = require('../../app/models');


exports.get = async(req, res, next) => {
    
    tbcontasreceber.findAll().then((resp) => {
        res.status(200).send(resp);
    }).catch((e)=> {
        res.status(500).send(e);
    });

}
/*
exports.getOne = async(req, res, next) => {
    var id = req.params.id;
    console.log(id);
    tbfuncionario.findOne({where: {id_funcionario:id}}).then(resp => {
        if(resp){
            res.status(200).send(resp);
        }
        res.status(404).send({msg: 'Funcionário não encontrado!'});
    }).catch((e)=>{
        res.status(500).send(e);
    })
}*/