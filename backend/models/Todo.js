const mongoose = require('mongoose');
const TodoSchema = new mongoose.Schema({
  task: String,
  position: Number,
  userId: mongoose.Schema.Types.ObjectId,
});
module.exports = mongoose.model('Todo', TodoSchema);