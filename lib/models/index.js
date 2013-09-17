var dbConfig = require('../../config').db;

if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize'),
    sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
      dialect:  dbConfig.dialect,
      protocol: dbConfig.protocol,
      port:     dbConfig.port,
      host:     dbConfig.host,
      define: {
        instanceMethods: {
          diff: function (origValues) {
            var diffObj = {},
              newValues = this.values;

            Object.keys(origValues).forEach(function (key) {
              if (origValues[key] !== newValues[key]) {
                diffObj[key] = newValues[key];
              }
            });
            return diffObj;
          }
        }
      }
    });

  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    User:      sequelize.import(__dirname + '/user'),
    Todo:      sequelize.import(__dirname + '/todo'),
    TodoList:  sequelize.import(__dirname + '/todo-list')
  };

  /*
   * Assumes that obj1 is original source and
   * we really just want the differences from obj2
   */
  global.db.objectDifference = function (origObj, newObj) {
    var diffObj = {};

    Object.keys(origObj).forEach(function (key) {
      if (origObj[key] !== newObj[key]) {
        diffObj[key] = newObj[key];
      }
    });
    return diffObj;
  };

  global.db.User.hasMany(global.db.TodoList, {as: 'Lists'});
  global.db.TodoList.hasMany(global.db.Todo, {as: 'Todos'});
}

module.exports = global.db;