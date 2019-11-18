const path = require('path');

exports.get = (req, res, next) => {
    console.log(path.join(__dirname));
    res.status(200).send({msg: 'Funcionou!'});
}

