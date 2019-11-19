const {tbfuncionario} = require(__dirname+'/../../app/models');


exports.get = (req, res, next) => {
    //console.log(tbfuncionario);    
    tbfuncionario.findAll().then((resp) => {
        res.status(200).send(resp);
    }).catch((e)=> {
        res.status(500).send(e);
    });

}

exports.getOne = (req, res, next) => {
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

exports.getById = (req, res, next) => {
	var id = req.params.id;
	tbfuncionario.findByPk(id).then(resp => {
		if(resp)
		  res.status(200).send(resp);
		res.status(404).send({msg: 'Funcionário não encontrado!'});
	}).catch((e)=>{
		res.status(500).send(e);
	});
		
}
