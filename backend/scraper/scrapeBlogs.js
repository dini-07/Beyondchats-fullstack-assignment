const axios = require("axios");
const cheerio = require("cheerio");
const Article = require("../models/Article");

const scrapeBeyondChatsBlogs = async () => {
  try {
    const baseUrl = "https://beyondchats.com/blogs/";
    const { data } = await axios.get(baseUrl);
    const $ = cheerio.load(data);

    // Collect all blog links
    let blogLinks = [];
    $("a").each((_, el) => {
      const link = $(el).attr("href");
      if (link && link.includes("/blogs/") && link !== "/blogs/") {
        blogLinks.push(link);
      }
    });

    // Remove duplicates
    blogLinks = [...new Set(blogLinks)];

    // Take 5 oldest (last ones)
    const oldestBlogs = blogLinks.slice(-5);

    for (let link of oldestBlogs) {
      const blogUrl = link.startsWith("http")
        ? link
        : `https://beyondchats.com${link}`;

      const blogPage = await axios.get(blogUrl);
      const $$ = cheerio.load(blogPage.data);

      const title = $$("h1").first().text().trim();
      const content = $$("article").text().trim();

      if (!title || !content) continue;

      const exists = await Article.findOne({ originalUrl: blogUrl });
      if (exists) continue;

      await Article.create({
        title,
        content,
        originalUrl: blogUrl,
      });

      console.log(`Saved: ${title}`);
    }
  } catch (error) {
    console.error("Scraping error:", error.message);
  }
};

module.exports = scrapeBeyondChatsBlogs;
