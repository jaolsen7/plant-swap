const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const plantSchema = new Schema({
  plantDescription: {
    type: String,
    required: 'You need to write a description!',
    minlength: 1,
    maxlength: 280,
  },
  plantName: {
    type: String,
    required: 'You need to a scientific or common name!',
    trim: true,
  },
  plantAuthor: {
    type: String,
    required: 'You need to enter your username!',
    trim: true,
  },
  plantImage: {
    type: String,
    required: 'You need to enter an image url!',
    trim: true,
  },
  zipCode: {
    type: Number,
    required: "You need a valid zipcode.",
    minlength: 5,
    maxlength: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: 'You need to enter text!',
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: 'You need to enter your username!',
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
