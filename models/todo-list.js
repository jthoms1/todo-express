module.exports = function(sequelize, DataTypes) {
  return sequelize.define("TodoList", {
    name       : DataTypes.STRING,
    status     : DataTypes.ENUM('active', 'inactive', 'deleted')
  });
};