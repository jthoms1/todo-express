#!/usr/bin/env node

/**
 * Module dependencies.
 */
var config = require('./config'),
  express  = require('express'),
  app      = express(),
  lessMiddleware = require('less-middleware'),
  server   = require('http').createServer(app),
  sequelize = require('sequelize'),
  path     = require('path');

app.configure(function () {
  app.set('port', config.port);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.engine('html', require('ejs').__express);
  app.use(express.compress());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('todo-express-cookie'));
  app.use(express.cookieSession());
  app.use(orm.express(config.db, {
    define: function (db, models) {
      require('./models')(db, models);
    }
  }));
  app.use(app.router);
  app.use(lessMiddleware({
    src: __dirname + '/public',
    compress: true
  }));
  app.use(express.static(path.join(__dirname, config.public_dir)));
});

app.configure('development', function () {
  app.use(express.errorHandler());
});

// Routes for the app
require('./routes')(app);

//Start the loop
server.listen(app.get('port'), function () {
  console.log("Express server listening on port " + app.get('port'));
  console.log(config.url);
});

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});
