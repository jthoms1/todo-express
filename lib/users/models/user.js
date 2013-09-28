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
          .success(function(item) {
            if (item === null) {
              next(new Error('Not found'));
            }
            next(null, item);
          })
          .error(next);
      }
    }
  });

  return User;
};