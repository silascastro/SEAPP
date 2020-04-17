const {tbcliente} = require(__dirname+'/../../app/models');
const {tbcontasreceber} = require(__dirname+'/../../app/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op; 
const sequelize = new Sequelize('estoque_db', 'postgres', 'masterkey', {
    host: '200.146.28.55',
    dialect: 'postgres'});

exports.get = (req, res, next) => {  
    //console.log(tbcliente.tbcliente.findAll());
    
    tbcliente.findAll({order:[['nome','ASC']]})
    .then((resp) => {
        res.status(200).send(resp);
    }).catch((e)=> {
        res.status(500).send(e.message);
    });
}

exports.getOnClienteById = (req, res, next) => {
    var id = req.params.id;
    tbcliente.findOne({
        where: {cod_cliente: id},
    }).then(resp => {
        if(resp){
            res.status(200).send(resp);
        }
        res.status(404).send({msg: 'Cliente não encontrado!'});
    }).catch((e)=>{
        res.status(500).send(e);
    });
}

exports.getOneClienteByNameHasNotCont = (req, res, next) => {
    var nome_param = req.params.nome;
    
    tbcliente.findAll({
        where: {
            nome: {[Op.like]: nome_param+'%'},
            cod_cliente: {
                [Op.notIn]: Sequelize.literal('(select cod_cliente from tbcontasreceber)')
            }
        },
        order:[['nome','ASC']],
    }).then(resp => {
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


exports.getOneClienteByName = (req, res, next) => {
    var nome_param = req.params.nome;

    sequelize.query("SELECT tbcliente.limite, tbcliente.cod_cliente,"+
     "tbcliente.nome, tbcliente.endereco, tbcliente.bairro," +
     "tbcliente.telefone, tbcliente.cidade, tbcliente.estado,"+ 
     "tbcliente.cep, tbcliente.email,"+
     "tbcliente.observacao, sum(tbcontasreceber.valor) AS \"tbcontasreceber.saldo_devedor\","+
     "tbcliente.limite - sum(tbcontasreceber.valor) AS \"tbcontasreceber.saldo_compra\" "+ 
     "FROM public.tbcliente AS tbcliente LEFT OUTER JOIN public.tbcontasreceber AS tbcontasreceber "+
     "ON tbcliente.cod_cliente = tbcontasreceber.cod_cliente "+
     //"FROM public.tbcliente, public.tbcontasreceber "+
     "WHERE tbcliente.nome LIKE \'"+nome_param+
     "%\' AND tbcliente.cod_cliente IN (tbcontasreceber.cod_cliente) "+
     //"WHERE (tbcliente.nome LIKE \'"+nome_param+"%\' AND tbcliente.cod_cliente = tbcontasreceber.cod_cliente) "+
     "GROUP BY tbcliente.cod_cliente, "+
     "tbcliente.limite, tbcliente.nome, tbcliente.endereco, tbcliente.bairro, tbcliente.telefone, tbcliente.cidade, tbcliente.estado, tbcliente.cep, tbcliente.email, tbcliente.observacao "+
     "ORDER BY tbcliente.nome ASC")
    .then(resp => {
        //console.log(resp);
        if(resp){
            res.status(200).send(resp[0]);
        }
        res.status(404).send({msg: 'Cliente não encontrado!'});
    }).catch((e)=>{
        //console.log('erro:',e);
        res.status(500).send(e.message);
    });
}

