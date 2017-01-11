const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true,
    default: false
  }
});

const TodoModel = mongoose.model('Todo', TodoSchema);

module.exports = TodoModel;