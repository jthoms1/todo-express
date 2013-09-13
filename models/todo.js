module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Todo", {
    text       : DataTypes.TEXT,
    isComplete : DataTypes.BOOLEAN,
    status     : DataTypes.ENUM('active', 'inactive', 'deleted')
  });
};