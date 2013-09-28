var express = require('express');

var app = module.exports = express();

app.set('views', __dirname + '/views');
app.use(function(err, req, res, next) {
  console.log(err.stack);
  res.send(500, { error: 'Server error occurred.' });
});

// Include models into the global db with sequelize
global.db.User = global.db.sequelize.import(__dirname + '/models/user');

// Setup routes
app.get('/login', require('./routes/login').view);
app.post('/login', require('./routes/login').login);
app.get('/signup', require('./routes/signup').view);
app.post('/signup', require('./routes/signup').create);
app.get('/profile', require('./routes/profile').view);
app.post('/profile', require('./routes/profile').update);