// Develop a Feedback model that will store the following information:
// - Feeback.js
// - user_id
// - feedback
// - date
// - rating


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  feedback: {
    type: String,
    required: [true, 'Please enter your feedback']
  },
  date: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number,
    required: true
  }
},
{
    timestamps: true
}
);

module.exports = Feedback = mongoose.model('feedback', FeedbackSchema);

