const express = require('express');
const TodoModel = require('./../models/todo');

const router = express.Router();

/**
 *
 * GET request
 *
 */
router.get('/data', (req, res, next) => {
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
});

/**
 *
 * POST request to create a new todo
 *
 */
router.post('/data', (req, res, next) => {
  var data = req.body;

  if (data.description) {
    TodoModel.create({
      description: data.description,
      completed: Boolean(data.completed) // For undefined value
    }, (err, todo) => {
      if (err) {
        console.log(err);

        return next({
          message: 'Unknown server error'
        });
      }

      res.status(200);

      return res.json({
        message: 'ok',
        id: todo._id
      });
    });
  } else {
    res.status(403);

    return res.json({
      message: 'Invalid data'
    });
  }
});

/**
 *
 * DELETE request to delete a todo
 *
 */
router.delete('/data', (req, res, next) => {
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
});

/**
 *
 * PUT request to update a todo
 *
 */
router.put('/data', (req, res, next) => {
  let id = req.body.id || req.query.id;
  let data = req.body;

  // Normalize request data    
  !data.description ? data.description = req.query.description : 0;
  data.completed === undefined ? data.completed = req.query.completed : 0;

  if (id) {
    TodoModel.findById(id, (err, todo) => {
      if (err) {
        console.log(err);

        return next({
          message: 'Unknown server error'
        });
      }

      // Only update when there is any difference
      if (data.description !== todo.description ||
        data.completed !== todo.completed) {
        // Update todo values
        todo.completed = todo.completed === data.completed || data.completed === undefined ? todo.completed : data.completed;
        todo.description = todo.description === data.description || !data.description ? todo.description : data.description;

        todo.save((err) => {
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
      // No difference
      else {
        res.status(200);

        return res.json({
          message: 'ok'
        });
      }
    });
  } else {
    res.status(403);

    return res.json({
      message: 'Invalid data'
    });
  }
});

module.exports = router;