const { Schema, model } = require('mongoose');

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
    type: String,
    required: "You need a valid zipcode.",
    minlength: 5,
    maxlength: 5,
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
      }
    },
  ],
});

const Plant = model('Plant', plantSchema);

module.exports = Plant;
