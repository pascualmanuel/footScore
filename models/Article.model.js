const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const articleSchema = new Schema(
  {
    headline: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
      // minlength: 30,
    },
    team: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    img: {
      type: String,
      // required: true,
    },
    author: { type: Schema.Types.ObjectId, ref: 'User' }
  }
)
const Article = mongoose.model("Article", articleSchema);

module.exports = Article;