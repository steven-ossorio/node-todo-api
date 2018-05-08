const { ObjectID } = require('mongodb');
let express = require('express');
let bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

let { mongoose } = require('./db/mongoose');
let { Todo } = require('./models/todo');
let { User } = require('./models/user');

let app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then( doc => {
    res.send(doc);
  }, err => {
    res.status(400).send(err);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then( todos => {
    res.send({ todos });
  }, e => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id)
    .then( todo => {
      if (!todo) {
        return res(404).send();
      }

      res.send({todo});
    }).catch( e => res.status(404).send());
});

app.listen(port, () => {
  console.log(`Started on Port ${port}`);
});

module.exports = { app };
