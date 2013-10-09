var express = require('express'),
  _ = require('underscore'),
  _s = require('underscore.string');

require('express-resource');

var app = module.exports = express();

app.use(function(err, req, res, next) {
  console.log(err.stack);
  res.send(500, { error: 'Server error occurred.' });
});

// Load all models as resources
_.each(global.db.models, function (Model, modelName) {
  var options = {},
    resourcePath = _s.slugify(modelName);

  // If this Model has a load method then preload it.
  if (typeof Model.load === 'function') {
    options.load = Model.load;
  }

  app.resource(
    resourcePath,
    require('./routes/base-resource.js')({ model: Model, name: resourcePath}),
    options
  );
});