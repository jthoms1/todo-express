var User = global.db.User,
    objectDifference = global.db.objectDifference;

exports.index = function (req, res) {
  User.findAll()
    .success(function (userItemSet) {
      res.send(userItemSet);
    })
    .error(function (err) {
      res.send(400, err);
    });
};

exports.create = function (req, res) {
  User.create(req.body)
    .success(function (userItem) {
      res.send(userItem.values);
    })
    .error(function (err) {
      res.send(400, err);
    });
};

exports.show = function (req, res) {
  res.send(req.user.values);
};

exports.update = function (req, res) {
  var previousUserValues = req.user.values;

  req.user.updateAttributes(req.body)
    .success(function () {
      var changes = objectDifference(previousUserValues, req.user.values);
      res.send(changes);
    })
    .error(function (err) {
      res.send(400, err);
    });
};

exports.destroy = function (req, res) {
  req.user.destroy()
    .success(function () {
      res.send(204);
    })
    .error(function (err) {
      res.send(400, err);
    });
};