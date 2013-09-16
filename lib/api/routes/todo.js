var Todo = global.db.Todo,
    objectDifference = global.db.objectDifference;

exports.index = function(req, res) {
  Todo.findAll()
    .success(function (todoItemSet) {
      res.send(todoItemSet);
    })
    .error(function (err) {
      res.send(400, err);
    });
};

exports.create = function(req, res) {
  Todo.create(req.body)
    .success(function (todoItem) {
      res.send(todoItem.values);
    })
    .error(function (err) {
      res.send(400, err);
    });
};

exports.show = function(req, res) {
  res.send(req.todo.values);
};

exports.update = function(req, res) {
  var previousUserValues = req.todo.values;

  req.todo.updateAttributes(req.body)
    .success(function () {
      var changes = objectDifference(previousUserValues, req.todo.values);
      res.send(changes);
    })
    .error(function (err) {
      res.send(400, err);
    });
};

exports.destroy = function(req, res) {
  req.todo.destroy()
    .success(function () {
      res.send(204);
    })
    .error(function (err) {
      res.send(400, err);
    });
};