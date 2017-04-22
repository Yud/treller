const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  login: String });

const User = mongoose.model(userSchema);

module.exports = User;
