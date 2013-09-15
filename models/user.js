module.exports = function(sequelize, DataTypes) {
  return sequelize.define("User", {
    username : {
      type:     DataTypes.STRING,
      validate: {
        notNull: true,
        unique: true
      }
    },
    emailAddress : {
      type:     DataTypes.STRING,
      validate: {
        notNull: true,
        isEmail: true,
        unique: true
      }
    },
    firstName    : {
      type:     DataTypes.STRING,
      validate: {
        notNull: true
      }
    },
    lastName     : {
      type:     DataTypes.STRING,
      validate: {
        notNull: true
      }
    }
  });
};