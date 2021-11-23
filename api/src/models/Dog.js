const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
      // Id, va a ser del tipo unique universal id, su valor defaul va a ser un universal unique(v4), no se le va a permitir tener valor en nulo, y va a ser la primary key
   id: {
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4,
        allowNull: false, 
        primaryKey : true
      },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
     // altura, va a ser un string (de hecho en la api también esta planteado como string), no se le va a permitir ser nulo
    height: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    // peso, va a ser de tipo string, no va a poder ser nulo
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    // años vida, string (en la api también es string), no nulo
    life_span: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // string(url)
    imagen: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // Este parámetro ayuda a distingir los perros de la api de los creados
    createInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  });
};
