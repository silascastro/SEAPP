module.exports = (sequelize, DataTypes) =>{
    const mensagens = sequelize.define('mensagens', {

        email: { 
          type: DataTypes.STRING(120),
          field: 'email'
        },
        message:{ 
          type: DataTypes.STRING,
          field: 'message'
        },
      }, {
        freezeTableName: true,
        shcema: 'public',
        timestamps: false
      });
    
      return mensagens;  
}