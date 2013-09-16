var en = require('lingo').en;

module.exports = function (options) {

  var Model = options.model,
    resourceName = en.singularize(options.path.split('/').pop()),
    opts = {},
    objectDifference = global.db.objectDifference;

  // If this Model has a load method then preload it.
  if (typeof Model.load === 'function') {
    opts.load = Model.load;
  }

  var actions = {
    index: function(req, res) {
      Model.findAll()
        .success(function (itemSet) {
          res.send(itemSet);
        })
        .error(function (err) {
          res.send(400, err);
        });
    },

    create: function (req, res) {
      Model.create(req.body)
        .success(function (item) {
          res.send(item.values);
        })
        .error(function (err) {
          res.send(400, err);
        });
    },

    show: function (req, res) {
      res.send(req[resourceName].values);
    },

    update: function (req, res) {
      var previousUserValues = req.user.values;

      req[resourceName].updateAttributes(req.body)
        .success(function () {
          var changes = objectDifference(previousUserValues, req[resourceName].values);
          res.send(changes);
        })
        .error(function (err) {
          res.send(400, err);
        });
    },

    destroy: function (req, res) {
      req[resourceName].destroy()
        .success(function () {
          res.send(204);
        })
        .error(function (err) {
          res.send(400, err);
        });
    }
  };

  return [options.path, actions, opts];
};