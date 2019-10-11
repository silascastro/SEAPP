module.exports = (sequelize, DataTypes) =>{
    const tbfuncionario = sequelize.define('tbfuncionario', {
        id_funcionario: {type: DataTypes.INTEGER, primaryKey: true},
        nome: {type: DataTypes.STRING},
        nomelogin: {type: DataTypes.STRING(30)},
        perfil: {type: DataTypes.INTEGER},
	senha: {type: DataTypes.STRING(35)},
        codigo1: DataTypes.STRING(15),
        codigo1: {
            type: DataTypes.STRING(15),
            field: 'codigo1'
        }
      }, {
        freezeTableName: true,
        schema: 'public',
        timestamps: false
      });
    
      return tbfuncionario;  
}
