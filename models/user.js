module.exports = function(sequelize, DataTypes) {
  return sequelize.define("User", {
    username : {
      type:     DataTypes.STRING,
      validate: {
        notNull: true
      }
    },
    emailAddress : {
      type:     DataTypes.STRING,
      validate: {
        notNull: true,
        isEmail: true
      }
    },
    password: {
      type:     DataTypes.STRING,
      validate: {
        notNull: true
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