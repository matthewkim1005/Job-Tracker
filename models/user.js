const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  postingLink: {
    type: String,
  },
  status: {
    type: String,
    enum: ['interested', 'applied', 'interviewing', 'rejected', 'accepted']
  },
  jobType: {
    type: String,
    enum: ['software', 'food-service', 'information-technology', 'other']
  },
  dateApplied: {
    type: Date,
  },
  favorite: {
    type: Boolean,
  }
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  applications: [applicationSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;