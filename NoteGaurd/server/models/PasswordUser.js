const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passwordUserSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  resetToken: {
    type: String,
    default: null,
  },
  resetTokenExpiry: {
    type: Date,
    default: null,
  },
});

const PasswordUser = mongoose.model('PasswordUser', passwordUserSchema);
module.exports = PasswordUser;
