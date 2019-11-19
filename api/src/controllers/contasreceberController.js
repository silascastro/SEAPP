const {tbcontasreceber} = require(__dirname+'/../../app/models');


exports.get = (req, res, next) => {
    
    tbcontasreceber.findAll().then((resp) => {
        res.status(200).send(resp);
    }).catch((e)=> {
        res.status(500).send(e);
    });

}

exports.getOne = (req, res, next) => {
    var id = req.params.id;
    tbcontasreceber.findAll({where: {cod_cliente:id}}).then(resp => {
        //console.log(resp.length);
	if(resp){
            res.status(200).send(resp);
        }
        res.status(404).send({msg: 'contas não encontradas para o id informado!'});
    }).catch((e)=>{
        res.status(500).send(e);
    })
}

