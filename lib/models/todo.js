module.exports = function(sequelize, DataTypes) {

  var Todo = sequelize.define("Todo", {
    text : DataTypes.TEXT,
    isComplete : {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    status : {
      type: DataTypes.ENUM,
      values: ['active', 'inactive', 'deleted'],
      defaultValue: 'active',
      validate: {
        isIn: [['active', 'inactive', 'deleted']]
      }
    },
    ToDoListId: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          args: true,
          msg: "A todo cannot exist outside of a list."
        },
        isInt: true
      }
    }
  }, {
    classMethods: {

      // Auto-loader for express to use as a middleware
      load: function (id, next) {
        Todo.find(id)
          .success(function(userItem) {
            if (userItem === null) {
              next(new Error('Todo not found'));
            }
            next(null, userItem);
          })
          .error(next);
      }
    }
  });

  return Todo;
};