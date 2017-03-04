const mongoose = require('mongoose');
const config = require('../config/db');

// User Schema
const TaskSchema = mongoose.Schema({
  task: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  isDone: {
    type: Boolean,
    required: true
  }
});

const Task = module.exports = mongoose.model('Task', TaskSchema);