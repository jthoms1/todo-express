var TodoList = global.db.TodoList;

exports.index = function(req, res) {
  TodoList.findAll()
    .success(function (todoListItemSet) {
      res.send(todoListItemSet);
    })
    .error(function (err) {
      res.send(400, err);
    });
};

exports.create = function (req, res) {
  TodoList.create(req.body)
    .success(function (todoListItem) {
      res.send(todoListItem.values);
    })
    .error(function (err) {
      res.send(400, err);
    });
};

exports.show = function (req, res) {
  res.send(req.todolist.values);
};

exports.update = function (req, res) {
  var previousUserValues = req.todolist.values;

  req.todolist.updateAttributes(req.body)
    .success(function () {
      var changes = req.todolist.diff(previousUserValues);
      res.send(changes);
    })
    .error(function (err) {
      res.send(400, err);
    });
};

exports.destroy = function (req, res) {
  req.todolist.destroy()
    .success(function () {
      res.send(204);
    })
    .error(function (err) {
      res.send(400, err);
    });
};