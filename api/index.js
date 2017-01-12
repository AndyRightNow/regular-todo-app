const express = require('express');
const TodoModel = require('./../models/todo');

const router = express.Router();


router
  .get('/data', (req, res, next) => {
    TodoModel.find({}, (err, todos) => {
      if (err) {
        console.log(err);

        return next({
          message: 'Unknown server error'
        });
      }

      var resJson;
      if (todos) {
        res.status(200);

        resJson = {
          message: 'ok',
          data: todos
        };
      } else {
        res.status(404);

        resJson = {
          message: 'No data'
        };
      }

      return res.json(resJson);
    })
  })
  .post('/data', (req, res, next) => {
    var data = req.body;

    if (data) {
      TodoModel.create({
        description: data.description,
        completed: Boolean(data.completed)
      }, (err) => {
        if (err) {
          console.log(err);

          return next({
            message: 'Unknown server error'
          });
        }

        res.status(200);

        return res.json({
          message: 'ok'
        });
      });
    } else {
      res.status(403);

      return res.json({
        message: 'Invalid data'
      });
    }
  })
  .delete('/data', (req, res, next) => {
    var id = req.body.id || req.query.id;

    if (id) {
      TodoModel.findByIdAndRemove(id, (err) => {
        if (err) {
          console.log(err);

          return next({
            message: 'Unknown server error'
          });
        }

        res.status(200);

        return res.json({
          message: 'ok'
        });
      });
    } else {
      res.status(403);

      return res.json({
        message: 'Invalid data'
      });
    }
  })
  .patch('/data', (req, res, next) => {
    let id = req.body.id || req.query.id;
    let data = req.body;

    data.description ? data.description = req.query.description : 0;
    data.completed ? data.completed = req.query.completed : 0;

    if (id) {
      TodoModel.findById(id, (err, todo) => {
        if (err) {
          console.log(err);

          return next({
            message: 'Unknown server error'
          });
        }

        todo.completed = todo.completed === data.completed ? todo.completed : data.completed;
        todo.description = todo.description === data.description ? todo.description : data.description;

        todo.save((err) => {
          if (err) {
            return next({
            message: 'Unknown server error'
            });
          }

          res.status(200);

          return res.json({
            message: 'ok'
          });
        });
      });
    } else {
      res.status(403);

      return res.json({
        message: 'Invalid data'
      });
    }
  });

module.exports = router;