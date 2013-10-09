var TodoList = global.db.models.TodoList,
  Todo = global.db.models.Todo;

exports.create = function (req, res) {

};

exports.view = function (req, res) {
  TodoList.find({ where: { id: req.params.id }, include: [{ model: Todo, as: 'Todos' }] })
    .success(function(todoList) {
      if (todoList === null) {
        res.send(404, 'Todo List not found');
      }
      console.log(todoList.values);
      res.render('index', {
        todoList: todoList.values
      });
    })
    .error(function (err) {
      res.send(400, err);
    });
};

exports.update = function (req, res) {

};
