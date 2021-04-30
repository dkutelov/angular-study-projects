const { Schema, model } = require("mongoose");

const postSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

module.exports = model("Post", postSchema);
