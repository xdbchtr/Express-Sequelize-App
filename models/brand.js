'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.item, {
        as:'items',
        foreignKey:'brand_id'
      })
      this.belongsTo(models.user, {
        as:'user',
        foreignKey:'user_id'
      })
    }
  }
  brand.init({
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'brand',
  });
  return brand;
};