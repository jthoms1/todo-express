var User = global.db.User;

exports.index = function(req, res){
  User.findAll().success(function(users) {
    res.send(users);
  });
};

exports.create = function(req, res){
  User
    .create(req.body)
    .success(function() {
      console.log(arguments);
      res.send('create user');
    })
    .error(function(err) {
      res.status(400).send(err);
    });
};

exports.show = function(req, res){
  User.find(req.params.user).success(function(todo) {
    if (todo === null) {
      res.status(404).send('User not found');
    }
    res.send(todo);
  });
};

exports.update = function(req, res){
  User.find(req.params.user).success(function(todo) {
  });
};

exports.destroy = function(req, res){

};