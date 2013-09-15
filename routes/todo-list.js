var TodoList = global.db.TodoList;

exports.index = function(req, res){
  TodoList.findAll().success(function(todoLists) {
    res.send(todoLists);
  });
};

exports.create = function(req, res){
  TodoList
    .create(req.body)
    .success(function() {
      res.send('create todolist');
    })
    .error(function(err) {
      res.status(400).send(err);
    });
};

exports.show = function(req, res){
  TodoList.find(req.params.todoList).success(function(todo) {
    if (todo === null) {
      res.status(404).send('Not found');
    }
    res.send(todo);
  });
};

exports.update = function(req, res){
  TodoList.find(req.params.todoList).success(function(todo) {
  });
};

exports.destroy = function(req, res){

};