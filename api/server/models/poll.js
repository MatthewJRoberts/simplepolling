const mongoose = require('mongoose');

let PollSchema = new mongoose.Schema({
  "poll_question": {
    type: String,
    required: true
  },
  "poll_options": [{
    "option_name": {
      type: String
    },
    "option_votes": {
      type: Number,
      default: 0
    }
  }],
});

let Poll = mongoose.model('Poll', PollSchema, 'polls');

module.exports = {Poll};