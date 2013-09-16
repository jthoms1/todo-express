module.exports = function(sequelize, DataTypes) {

  var User = sequelize.define("User", {
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
  }, {
    classMethods: {

      // Auto-loader for express to use as a middleware
      load: function (id, next) {
        User.find(id)
          .success(function(userItem) {
            if (userItem === null) {
              next(new Error('User not found'));
            }
            next(null, userItem);
          })
          .error(next);
      }
    }
  });

  return User;
};