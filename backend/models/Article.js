const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    author: String,
    publishedDate: String,
    originalUrl: String,
    isUpdated: { type: Boolean, default: false },
    references: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", ArticleSchema);
