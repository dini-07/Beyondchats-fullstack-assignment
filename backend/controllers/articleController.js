const Article = require("../models/Article");

exports.getArticles = async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
};

exports.getArticle = async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.json(article);
};

exports.createArticle = async (req, res) => {
  const article = new Article(req.body);
  await article.save();
  res.json(article);
};

exports.updateArticle = async (req, res) => {
  const updated = await Article.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

exports.deleteArticle = async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
