const {tbproduto} = require('../../app/models');

module.exports = (sequelize, DataTypes) =>{
    const tbprodutofoto = sequelize.define('tbprodutofoto', {
        cod_produto: {type: DataTypes.INTEGER, primaryKey: true},
        sequencia: {type: DataTypes.INTEGER, primaryKey: true},
        caminho_foto: {type: DataTypes.STRING},
        indice_foto: {type: DataTypes.INTEGER},
      }, {
        freezeTableName: true,
        schema: 'public',
        timestamps: false
    });
    
    tbprodutofoto.associate = function(models){
      models.tbprodutofoto.belongsTo(models.tbproduto, {foreignKey: 'cod_produto'}, );
    }
    
    return tbprodutofoto;  
}