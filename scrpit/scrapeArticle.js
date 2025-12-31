const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeArticle(url) {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  return $("article").text() || $("body").text();
}

module.exports = scrapeArticle;
