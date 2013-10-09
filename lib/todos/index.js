var express = require('express'),
  fs = require('fs'),
  path = require('path'),
  _s = require('underscore.string');

var app = module.exports = express();

app.set('views', __dirname + '/views');
app.use(function(err, req, res, next) {
  console.log(err.stack);
  res.send(500, { error: 'Server error occurred.' });
});

// Include models into the global db with sequelize
var modelFiles = fs.readdirSync(__dirname + '/models/');
modelFiles.forEach(function (fileName) {
  fileName = path.basename(fileName, '.js');
  var modelName = _s.classify(fileName);
  global.db.models[modelName] = global.db.sequelize.import(__dirname + '/models/' + fileName);
});

// Define relationships
global.db.models.TodoList.hasMany(global.db.models.Todo, {as: 'Todos'});

// Setup routes
app.post('/', require('./routes/todo').create);
app.post('/:id', require('./routes/todo').update);
app.post('/list', require('./routes/todo-list').create);
app.get('/list/:id', require('./routes/todo-list').view);
app.post('/list/:id', require('./routes/todo-list').update);