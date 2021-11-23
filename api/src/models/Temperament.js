// defino dato deltemperamento
const {DataTypes}=require('sequelize');

module.exports=(sequelize)=>{
    sequelize.define('temperament',{
         //id se genera solo, sequelize por defecto lo genera solo
        name:{
            type:DataTypes.STRING,
            allowNull:true
        },
    });
};