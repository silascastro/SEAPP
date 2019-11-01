//const {tbcliente} = require('../../app/models');

module.exports = (sequelize, DataTypes) =>{
    const tbpedidoexterno = sequelize.define('tbpedidoexterno', {
        numero_pedido: {type: DataTypes.INTEGER, primaryKey: true,
	autoIncrement: true},
        cod_cliente: {type: DataTypes.INTEGER,},
        nome_cliente: {type: DataTypes.STRING(300)},
        data_hora: {type: DataTypes.DATE},
        cod_vendedor: {type: DataTypes.INTEGER},
        nome_vendedor: {type: DataTypes.STRING(50)},
        subtotal: {type: DataTypes.DECIMAL(18,5)},
        total: {type: DataTypes.DECIMAL(18, 5)}
      }, {
        freezeTableName: true,
        schema: 'public',
        timestamps: false
    });
    return tbpedidoexterno;  
}
