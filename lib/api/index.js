var express = require('express');
require('express-resource');

var app = module.exports = express();

app.resource('users', require('./routes/user'), { load: global.db.User.load });
app.resource('todos', require('./routes/todo'), { load: global.db.Todo.load });
app.resource('todo-lists', require('./routes/todo-list'), { load: global.db.TodoList.load });
