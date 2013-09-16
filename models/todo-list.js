module.exports = function(sequelize, DataTypes) {
  return sequelize.define("TodoList", {
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
  });
};