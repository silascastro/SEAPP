//const {PET} = require('../../app/models');

exports.get = (req, res, next) => {
    /*PET.findAll().then(resp => {
        res.status(200).send(resp);
    }).catch(() => {
        res.status(500).send({message: 'erro ao realizar requisição'});
    })*/
    res.status(200).send({msg: 'Funcionou!'});
}
/*
exports.getOneById = (req, res, next) => {
    PET.findOne({where: {id: req.params.id}}).then(resp => {
            res.status(200).send(resp);   
    }).catch(() => {
        res.status(500).send({message: 'erro ao realizar requisição'});
    })
}

exports.post = (req, res, next) => {

        PET.create({petName: req.body.petName, petAge: req.body.petAge, localization: req.body.localization}).then(resp => {
            res.status(201).send(resp);
        }).catch((err) => {
            console.log(err);
            res.status(500).send({message: 'erro ao realizar requisição'});
        })
        //res.json(animal);

}


exports.delete = (req, res, next) => {
    PET.destroy({where: {id:req.params.id}}).then(resp => {
        res.status(200).send({message: 'elemento deletado com sucesso!'});
    }).catch(() => {
        res.status(500).send({message: 'erro ao realizar requisição'});
    })
}*/
