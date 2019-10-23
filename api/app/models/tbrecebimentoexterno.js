//const {tbcontasreceber} = require('../../app/models');


module.exports = (sequelize, DataTypes) =>{
    const tbrecebimentoexterno = sequelize.define('tbrecebimentoexterno', {
        sequencia: {type: DataTypes.INTEGER, primaryKey: true},
        cod_vendedor: {type: DataTypes.INTEGER},
        cod_cliente: {type: DataTypes.STRING},
        nome_cliente: {type: DataTypes.STRING},
        numero_documento: {type: DataTypes.STRING},
        data_vencimento: {type: DataTypes.DATE},
        valor_documento: {type: DataTypes.DECIMAL},
        valor_recebido: {type: DataTypes.DECIMAL},
      }, {
        freezeTableName: true,
        schema: 'public',
        timestamps: false
    });

    return tbrecebimentoexterno;  
}
