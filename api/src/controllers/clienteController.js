const {tbcliente} = require('../../app/models');
const {tbcontasreceber} = require('../../app/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op; 

exports.get = async(req, res, next) => {
    
    tbcliente.findAll({order:[['nome','ASC']]}).then((resp) => {
        res.status(200).send(resp);
    }).catch((e)=> {
        res.status(500).send(e);
    });

}

exports.getOnClienteById = async(req, res, next) => {
    var id = req.params.id;
    tbcliente.findOne({
        where: {cod_cliente: id},
        //include: [tbcontasreceber],
        //attributes:['tbcontasreceber.valor',[Sequelize.fn('sum',Sequelize.col('tbcontasreceber.valor')),'saldo_devedor']],
       // group: ['tbcontasreceber.cod_cliente'],
    }).then(resp => {
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

    tbcliente.findAll(
        {
            where: {nome: {[Op.like]: nome_param+'%'}, cod_cliente: [Sequelize.col("tbcontasreceber.cod_cliente")]},
            attributes: [
                "limite",
                "tbcontasreceber.cod_cliente",
            "nome", "endereco","bairro", "telefone", "cidade","estado","cep","email"
            ],
            //attributes:[['tbcontasreceber.valor',[Sequelize.fn('sum',Sequelize.col('tbcontasreceber.valor')),'saldo_devedor']],],
            group: [

                //"cod_cliente",
                "tbcontasreceber.cod_cliente",
                "limite", 
                "nome", 
                "endereco",
                "bairro", 
                "telefone", 
                "cidade",
                "estado",
            "cep","email",              
            /*'tbcontasreceber.cod_cliente',
            'tbcontasreceber.documento',
            'tbcontasreceber.tipo',
            'tbcontasreceber.dt_vencimento',*/],
            include: [{model: tbcontasreceber,as:'tbcontasreceber',
                    attributes:[
                        [Sequelize.fn('sum',Sequelize.col('tbcontasreceber.valor')),'saldo_devedor'],
                        [Sequelize.literal('tbcliente.limite - sum(tbcontasreceber.valor)'),'saldo_compra']
                    ]
            }],
            order:[['nome','ASC']],
            raw: true,
        })
    .then(resp => {
        //console.log(resp);
        if(resp){
            res.status(200).send(resp);
        }
        res.status(404).send({msg: 'Cliente não encontrado!'});
    }).catch((e)=>{
        //console.log('erro:',e);
        res.status(500).send(e.message);
    });
}
