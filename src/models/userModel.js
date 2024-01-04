const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      max: 30,
      min: 3
    },
    password: {
      type: String,
      required: true,
      max: 30,
      min: 7,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      required: true,
      default: true,
    }

  }, {
    timestamps: true,
    versionKey: false
  })

module.exports = userModel = model("user", userSchema);
