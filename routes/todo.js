var Todo = global.db.Todo,
    objectDifference = global.db.objectDifference;

exports.index = function(req, res){
  Todo.findAll().success(function(todoItemSet) {
    res.send(todoItemSet);
  });
};

exports.create = function(req, res){
  Todo
    .create(req.body)
    .success(function(todoItem) {
      res.send(todoItem.values);
    })
    .error(function(err) {
      res.status(400).send(err);
    });
};

exports.show = function(req, res){
  Todo.find(req.params.todo).success(function(todoItem) {
    if (todoItem === null) {
      res.status(404).send('Not found');
    }
    res.send(todoItem);
  });
};

exports.update = function(req, res){
  var previousUserValues = {};

  Todo.find(req.params.todo).then(function (todoItem) {
    if (todoItem === null) {
      res.status(404).send('Todo not found');
    }
    previousUserValues = todoItem.values;
    return todoItem.updateAttributes(req.body);
  }, function (err) {
    res.status(400).send(err);
  }).then(function (todoItem) {
    var changes = objectDifference(previousUserValues, todoItem.values);
    res.send(changes);
  }, function (err) {
    res.status(400).send(err);
  });
};

exports.destroy = function(req, res){
  Todo.find(req.params.todo).then(function (todoItem) {
    if (todoItem === null) {
      res.status(404).send('Todo not found');
    }
    return todoItem.destroy();
  }, function (err) {
    res.status(400).send(err);
  }).then(function () {
    res.status(204).send();
  }, function (err) {
    res.status(400).send(err);
  });
};