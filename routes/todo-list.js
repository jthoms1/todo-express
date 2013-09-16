var TodoList = global.db.TodoList,
    objectDifference = global.db.objectDifference;

exports.index = function(req, res){
  TodoList.findAll().success(function(todoListItemSet) {
    res.send(todoListItemSet);
  });
};

exports.create = function(req, res){
  TodoList
    .create(req.body)
    .success(function(todoListItem) {
      res.send(todoListItem.values);
    })
    .error(function(err) {
      res.status(400).send(err);
    });
};

exports.show = function(req, res){
  TodoList.find(req.params.todoList).success(function(todoListItem) {
    if (todoListItem === null) {
      res.status(404).send('TodoList Not found');
    }
    res.send(todoListItem.values);
  });
};

exports.update = function(req, res){
  var previousUserValues = {};

  TodoList.find(req.params.todoList).then(function (todoListItem) {
    if (todoListItem === null) {
      res.status(404).send('TodoList not found');
    }
    previousUserValues = todoListItem.values;
    return todoListItem.updateAttributes(req.body);
  }, function (err) {
    res.status(400).send(err);
  }).then(function (todoListItem) {
    var changes = objectDifference(previousUserValues, todoListItem.values);
    res.send(changes);
  }, function (err) {
    res.status(400).send(err);
  });
};

exports.destroy = function(req, res){
  TodoList.find(req.params.todoList).then(function (todoListItem) {
    if (todoListItem === null) {
      res.status(404).send('TodoList not found');
    }
    return todoListItem.destroy();
  }, function (err) {
    res.status(400).send(err);
  }).then(function () {
    res.status(204).send();
  }, function (err) {
    res.status(400).send(err);
  });
};