//const {tbcliente} = require('../../app/models');

module.exports = (sequelize, DataTypes) =>{
    const tbpedidoexternoitens = sequelize.define('tbpedidoexternoitens', {
        sequencia: {type: DataTypes.INTEGER, primaryKey: true,
	autoIncrement: true},
        numero_pedido: {type: DataTypes.INTEGER,},
        id_produto: {type: DataTypes.INTEGER,},
        cod_produto: {type: DataTypes.STRING(50)},
        descricao: {type: DataTypes.STRING(300)},
        marca: {type: DataTypes.STRING(50)},
        tipo: {type: DataTypes.STRING(20)},
        qtd_pedida: {type: DataTypes.DECIMAL(18,3)},
        preco_unitario: {type: DataTypes.DECIMAL(18, 5)},
        preco_total: {type: DataTypes.DECIMAL(18, 5)},
      }, {
        freezeTableName: true,
        schema: 'public',
        timestamps: false
    });
    return tbpedidoexternoitens;  
}
