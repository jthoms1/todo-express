var currentEnv = process.env.NODE_ENV || 'development';

// Set current envirnoment
exports.env = {
  production: false,
  staging: false,
  development: false
};

exports.env[currentEnv] = true;

exports.db = {
  user     : "todo",
  database : "todo",
  password : "password",
  dialect  : "postgres",
  protocol : "postgres",
  host     : "localhost",
  port     : 5432
};

exports.port = process.env.PORT || 1337;
exports.url = 'http://localhost:' + exports.port + '/';
exports.public_dir = "public";