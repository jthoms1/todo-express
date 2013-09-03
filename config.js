var currentEnv = process.env.NODE_ENV || 'development';

// Set current envirnoment
exports.env = {
  production: false,
  staging: false,
  development: false
};

exports.env[currentEnv] = true;

exports.db = {
  database : "",
  protocol : "postgres",
  host     : "",
  port     : "5432",
  user     : "",
  password : "",
  query    : {
    debug : true,
    pool  : true
  }
};

exports.public_dir = (exports.env.development) ? "public_dev" : "public_prod";
exports.upload_dir = "uploads";
exports.port = process.env.PORT || 1337;

/* We can access nodejitsu enviroment variables from process.env */
/* Note: the SUBDOMAIN variable will always be defined for a nodejitsu app */
exports.url = 'http://localhost:' + exports.port + '/';
if (process.env.SUBDOMAIN) {
  exports.url = 'http://' + process.env.SUBDOMAIN + '.jit.su/';
}
