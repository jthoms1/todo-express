var Todo = global.db.Todo;

exports.index = function(req, res){
  Todo.findAll().success(function(todos) {
    res.send(todos);
  });
};

exports.create = function(req, res){
  Todo
    .create(req.body)
    .success(function() {
      res.send('create todo');
    })
    .error(function(err) {
      res.status(400).send(err);
    });
};

exports.show = function(req, res){
  Todo.find(req.params.todo).success(function(todo) {
    if (todo === null) {
      res.status(404).send('Not found');
    }
    res.send(todo);
  });
};

exports.update = function(req, res){
  Todo.find(req.params.todo).success(function(todo) {
  });
};

exports.destroy = function(req, res){

};