var User = global.db.User,
    objectDifference = global.db.objectDifference;

exports.index = function(req, res){
  User.findAll().success(function(userItemSet) {
    res.send(userItemSet);
  });
};

exports.create = function(req, res){
  User
    .create(req.body)
    .success(function(userItem) {
      res.send(userItem.values);
    })
    .error(function(err) {
      res.status(400).send(err);
    });
};

exports.show = function(req, res){
  User.find(req.params.user).success(function(userItem) {
    if (userItem === null) {
      res.status(404).send('User not found');
    }
    res.send(userItem.values);
  });
};

exports.update = function(req, res){
  var previousUserValues = {};

  User.find(req.params.user).then(function (userItem) {
    if (userItem === null) {
      res.status(404).send('User not found');
    }
    previousUserValues = userItem.values;
    return userItem.updateAttributes(req.body);
  }, function (err) {
    res.status(400).send(err);
  }).then(function (userItem) {
    var changes = objectDifference(previousUserValues, userItem.values);
    res.send(changes);
  }, function (err) {
    res.status(400).send(err);
  });
};

exports.destroy = function(req, res){
  User.find(req.params.user).then(function (userItem) {
    if (userItem === null) {
      res.status(404).send('User not found');
    }
    return userItem.destroy();
  }, function (err) {
    res.status(400).send(err);
  }).then(function () {
    res.status(204).send();
  }, function (err) {
    res.status(400).send(err);
  });
};