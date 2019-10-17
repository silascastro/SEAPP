const {tbcontasreceber} = require('../../app/models');


module.exports = (sequelize, DataTypes) =>{
    const tbcliente = sequelize.define('tbcliente', {
        cod_cliente: {type: DataTypes.INTEGER, primaryKey: true},
        nome: {type: DataTypes.STRING},
        cod_vendedor: {type: DataTypes.INTEGER},
        endereco: {type: DataTypes.STRING},
        bairro: {type: DataTypes.STRING},
        telefone: {type: DataTypes.STRING},
        cidade: DataTypes.STRING,
	      estado: DataTypes.STRING,
	      cep: DataTypes.STRING,
        limite: DataTypes.STRING,
        email: {type: DataTypes.STRING,}
      }, {
        freezeTableName: true,
        schema: 'public',
        timestamps: false
    });

    tbcliente.associate = function(models){
      //models.tbcliente.belongsTo(models.tbcontasreceber, {foreignKey: 'cod_cliente'});
      models.tbcliente.hasMany(models.tbcontasreceber, {foreignKey: 'cod_cliente', as: 'tbcontasreceber'});
      
    };
    
    return tbcliente;  
}
