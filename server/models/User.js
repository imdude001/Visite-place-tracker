const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  dp: {
    type: String,
    required: true,
  },
  placeCount: {
    type: [],
    default: null,
  },
  postCount: {
    type: [],
    default: null,
  },
  likes: {
    type: [],
    default: null,
  },
  places: {
    type: [],
    default: null,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

userSchema.plugin(uniqueValidator);

module.exports = User;
