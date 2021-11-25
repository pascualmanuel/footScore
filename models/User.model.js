const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 1
    },
    country: {
      type: String,
      // enum: ['']
      // required: true
    },
    league: {
      type: String,
      // required: true,
    },
    team: {
      type: String,
      // required: true,
    },
    img: String,
    role: {
      type: String,
      // enum: ['STANDARD', 'PRO', '-', 'PM'],
      // default: 'STANDARD',
    },
    journalist: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);


module.exports = User;