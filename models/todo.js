module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Todo", {
    text       : DataTypes.TEXT,
    isComplete : {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    status     : {
      type:   DataTypes.ENUM,
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
  });
};