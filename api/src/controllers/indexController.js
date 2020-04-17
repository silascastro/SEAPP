const path = require('path');

exports.get = (req, res, next) => {
    //console.log(path.join(__dirname));
    console.log(process.cwd());
    console.log(__dirname);
    res.status(200).send({msg: 'api funcionando!'});
}

