module.exports = (sequelize, DataTypes) =>{
    const tbempresa = sequelize.define('tbempresa', {
        id_empresa: {type: DataTypes.INTEGER, primaryKey: true},
        codigo: {type: DataTypes.STRING, primaryKey: true},
        nome_fantasia: {type: DataTypes.STRING},
        
      }, {
        freezeTableName: true,
        schema: 'public',
        timestamps: false
      });
    
      return tbempresa;  
}
