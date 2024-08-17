const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const passwordSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  website: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  category: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});


// module.exports = mongoose.model('password', passwordSchema);
module.exports = mongoose.models.password || mongoose.model('password', passwordSchema);