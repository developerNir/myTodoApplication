const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { ObjectId } = mongoose.Schema;

const nodeSchema = new Schema({
  note: {
    type: String,
  },
  todoId: {
    type: ObjectId,
    ref: "todo",
  }
}, {
  timestamps: true,
  versionKey: false,
})

module.exports = noteTodo = model('noteTodo', nodeSchema);
