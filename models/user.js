module.exports = function(sequelize, DataTypes) {
  return sequelize.define("User", {
    username     : DataTypes.STRING,
    emailAddress : DataTypes.STRING,
    firstName    : DataTypes.STRING,
    lastName     : DataTypes.STRING
  });
};