module.exports = (sequelize, DataTypes) =>{
    const tbfuncionario = sequelize.define('tbfuncionario', {
        //id_functionario: DataTypes.INTEGER,
        //nome: DataTypes.STRING,
        //nomelogin: DataTypes.STRING(30),
        //perfil: DataTypes.INTEGER,
        //codigo1: DataTypes.STRING(15),
        codigo2: {
            type: DataTypes.STRING(15),
            field: 'codigo2'
        }
      }, {
        freezeTableName: true,
        shcema: 'public',
        timestamps: false
      });
    
      return tbfuncionario;  
}