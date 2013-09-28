var express = require('express');
require('express-resource');

var app = module.exports = express();

app.set('views', __dirname + '/views');

app.use(function(err, req, res, next) {
  console.log(err.stack);
  res.send(500, { error: 'Server error occurred.' });
});

app.resource('users', require('./routes/user'), { load: global.db.User.load });
app.resource('todos', require('./routes/todo'), { load: global.db.Todo.load });
app.resource('todolists', require('./routes/todolist'), { load: global.db.TodoList.load });
