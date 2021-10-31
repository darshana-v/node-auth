const mongoose = require("mongoose");
// const validator = require('mongoose-validator');

const userSchema = new mongoose.Schema({
  childName: {
    type: String,
    required: true,
    max: 255,
    min: 4,
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 4,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
    max: 16,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
  childDob: {
    type: Date,
    required: true,
    default: null,
  },
  gender: {
    type: String,
    required: true,
    max: 255,
    min: 4,
    default: null,
  },
  languagePreference: {
    type: String,
    max: 255,
    min: 4,
    default: "english",
  },
  registerDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
