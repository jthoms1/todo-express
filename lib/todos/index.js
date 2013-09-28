var express = require('express');

var app = module.exports = express();

app.use(function(err, req, res, next) {
  console.log(err.stack);
  res.send(500, { error: 'Server error occurred.' });
});

// Include models into the global db with sequelize
global.db.Todo = global.db.sequelize.import(__dirname + '/models/todo');
global.db.TodoList = global.db.sequelize.import(__dirname + '/models/todo-list');

// Setup routes
app.post('/create', require('./routes/todo').create);
app.get('/:todo', require('./routes/todo').view);
app.post('/:todo', require('./routes/todo').update);
app.post('/list/create', require('./routes/todo-list').create);
app.get('/list/:todolist', require('./routes/todo-list').view);
app.post('/list/:todolist', require('./routes/todo-list').update);