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
        description: data.description || data.desc,
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
    }
    else {
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
    }
    else {
      res.status(403);

      return res.json({
        message: 'Invalid data'
      });
    }
  });

module.exports = router;