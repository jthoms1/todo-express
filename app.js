#!/usr/bin/env node

/**
 * Module dependencies.
 */
var config       = require('./config'),
  express        = require('express'),
  http           = require('http'),
  path           = require('path'),
  db             = require('./db');

var app = express();

app.configure(function () {
  app.set('port', config.port);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.engine('jade', require('jade').__express);
  app.use(express.bodyParser());
  app.use(express.compress());
  app.use(express.methodOverride());
  app.use(express.cookieParser('todo-express-cookie'));
  app.use(express.cookieSession());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, config.public_dir)));
});

app.configure('development', function () {
  app.use(express.errorHandler());
});

// Routes for the app
app.get('/', function (req, res) {
  res.render('index', {
    main: 'hello world'
  });
});

app.use('/users', require('./lib/users'));
app.use('/todos', require('./lib/todos'));
app.use('/api', require('./lib/api'));

global.db.User.hasMany(global.db.TodoList, {as: 'Lists'});
global.db.TodoList.hasMany(global.db.Todo, {as: 'Todos'});

db.sequelize.sync().complete(function(err) {
  if (err) {
    throw err;
  } else {

    //Start the loop
    http.createServer(app).listen(app.get('port'), function () {
      console.log("Express server listening on port " + app.get('port'));
      console.log(config.url);
    });
  }
});

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});
