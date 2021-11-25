const { Schema, model } = require("mongoose");


const ArticleSchema = new Schema(
    {
        headline:{
          type: String,
          required: true,
        },
        comment:{
            type: String,
            required: true,
            minlength: 30,
        },
        team:{
          type: String,
          required: true,
        },
        date:{
          type: Date,
          required: true,
        },
        img:{
          type: String,
          required: true,
        },
        author:{
          type: String,
        }
    }
)
const Article = model("Article", ArticleSchema);

module.exports = Article;