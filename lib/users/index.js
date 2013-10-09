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

// Setup routes
app.get('/login', require('./routes/login').view);
app.post('/login', require('./routes/login').login);
app.get('/signup', require('./routes/signup').view);
app.post('/signup', require('./routes/signup').signup);
app.get('/profile', require('./routes/profile').view);
app.post('/profile', require('./routes/profile').update);