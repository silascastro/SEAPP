

module.exports = (sequelize, DataTypes) =>{
    const tbproduto = sequelize.define('tbproduto', {
        cod_produto: {type: DataTypes.INTEGER, primaryKey: true},
        codigo1: {type: DataTypes.STRING},
        codigo2: {type: DataTypes.STRING},
        marca: {type: DataTypes.STRING},   
        aplicacao: {type: DataTypes.STRING},
        descricao: {type: DataTypes.STRING},
        local_estoque: {type: DataTypes.STRING},
        estoque_minimo: {type: DataTypes.INTEGER},
        qtd: {type: DataTypes.INTEGER},
        preco_compra: {type: DataTypes.INTEGER},
        preco_venda: {type: DataTypes.INTEGER},
        preco_minimo: {type: DataTypes.INTEGER},
	tipo_unidade: {type: DataTypes.STRING},
        //telefone: {type: DataTypes.STRING},
        //cidade: DataTypes.STRING,
	    //  estado: DataTypes.STRING,
        //cep: DataTypes.STRING,
        //observacao: DataTypes.STRING,
        //limite: DataTypes.STRING,
       // email: {type: DataTypes.STRING,}
      }, {
        freezeTableName: true,
        schema: 'public',
        timestamps: false
    });

    tbproduto.associate = function(models){
        //models.tbcliente.belongsTo(models.tbcontasreceber, {foreignKey: 'cod_cliente'});
        models.tbproduto.hasMany(models.tbprodutofoto, {foreignKey: 'cod_produto', 
        as: 'tbprodutofoto'});
        
    };
    
    return tbproduto;  
}
