module.exports = function(sequelize, DataTypes) {

  var TodoList = sequelize.define("TodoList", {
    name : {
      type: DataTypes.STRING,
      validate: {
        notNull: true
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: true
      }
    },
    status : {
      type: DataTypes.ENUM,
      values: ['active', 'inactive', 'deleted'],
      defaultValue: 'active',
      validate: {
        isIn: [['active', 'inactive', 'deleted']]
      }
    }
  }, {
    classMethods: {

      // Auto-loader for express to use as a middleware
      load: function (id, next) {
        TodoList.find(id)
          .success(function(userItem) {
            if (userItem === null) {
              next(new Error('Todo List not found'));
            }
            next(null, userItem);
          })
          .error(next);
      }
    }
  });

  return TodoList;
};