'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MaterialType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Material }) {
      // define association here
      this.hasMany(Material, { foreignKey: "type" })
    }
  }
  MaterialType.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MaterialType',
  });
  return MaterialType;
};