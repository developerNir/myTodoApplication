const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { ObjectId } = mongoose.Schema.Types;


const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: ObjectId,
      ref: "user",
    },
    priority: {
      type: String,
      required: true,
      enum: ["rad","green", "yellow",]
    },
    setTime: {
      type: String,
      required: true,
    }

}, {
  timestamps: true,
  versionKey: false
})


module.exports = todoModel = model('todo', todoSchema);