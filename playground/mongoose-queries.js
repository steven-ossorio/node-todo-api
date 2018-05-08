const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

let id = '5aed17842fa522b7b45f26ad';

if(!ObjectID.isValid(id)){
  console.log("ID not valid");
}
//
// Todo.find({
//   _id: id
// }).then( todos => {
//   console.log('todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then( todo => {
//   console.log('todo', todo);
// });

// Todo.findById(id).then( todo => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('todo by Id', todo);
// }).catch( e => {
//   console.log(e);
// });

User.findById(id).then( user => {
  if (!user) {
    return console.log("Unable to find user");
  }
  console.log(user);
}, e => {
  console.log(e);
});
