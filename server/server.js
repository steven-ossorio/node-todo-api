let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

let Todo = mongoose.model('Todo', {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});

var newTodo = new Todo({
  text: 'Cook dinner'
});

newTodo.save().then( doc => {
  console.log('Saved todo.', doc);
}, e => {
  console.log('Unable to save todo.', e);
});

var newTodoTwo = new Todo({
  text: 'Second todo',
  completed: true,
  completedAt: 2345
});

newTodoTwo.save().then( doc => {
  console.log(doc);
}, e => {
  console.log(e);
});
