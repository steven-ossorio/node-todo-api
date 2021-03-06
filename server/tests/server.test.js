const expect        = require('expect');
const request       = require('supertest');
const { ObjectID }  = require('mongodb');

const { app }       = require('./../server');
const { Todo }      = require('./../models/todo');
const { todos, populateTodos } = require('./seed/seed');

beforeEach(populateTodos);

describe('POST /todos', () => {
  it('Should create a new todo', done => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect( res => {
        expect(res.body.text).toBe(text);
      })
      .end( (err, res) => {
        if (err) {
          done(err);
        }

        Todo.find({text}).then( todos => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch( e => done(e));
      });
  });

  it('Should not create todo with invalid body data', done => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end( (err, res) => {
        if (err) {
          done(err);
        }

        Todo.find().then( todos => {
          expect(todos.length).toBe(2);
          done();
        }).catch( e => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('Should return all todos', done => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect( res => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', (req, res) => {
  it('Should return todo doc', done => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect( res => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('Should return 404 if todo not found', done => {
    let hexID = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${hexID}`)
      .expect(404)
      .end(done);
  });

  it('Should return 404 for none object ids', done => {
    request(app)
      .get(`/todos/123abc`)
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('Should remove a todo', done => {
    let hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect( res => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end( (err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId).then( todo => {
          expect(todo).toNotExist();
          done();
        }).catch( e => done(e));
      });
  });

  it('Should return 404 if todo not found', done => {
    let hexID = new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${hexID}`)
      .expect(404)
      .end(done);
  });

  it('Should return 404 if object id is invalid', done => {
    request(app)
      .delete(`/todos/123abc`)
      .expect(404)
      .end(done);
  });
});
