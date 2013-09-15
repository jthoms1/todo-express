var dbConfig = require('../config').db;

if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize'),
  sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    dialect:  dbConfig.dialect,
    protocol: dbConfig.protocol,
    port:     dbConfig.port,
    host:     dbConfig.host
  });

  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    User:      sequelize.import(__dirname + '/user'),
    Todo:      sequelize.import(__dirname + '/todo'),
    TodoList:  sequelize.import(__dirname + '/todo-list')
  };

  global.db.User.hasMany(global.db.TodoList, {as: 'Lists'});
  global.db.TodoList.hasMany(global.db.Todo, {as: 'Todos'});
}

module.exports = global.db;