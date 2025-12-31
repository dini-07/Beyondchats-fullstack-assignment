const axios = require("axios");

async function searchGoogle(title) {
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(title)}`;
  const res = await axios.get(searchUrl);

  // placeholder demo links
  return [
    { title: "Sample Blog 1", link: "https://example.com/blog1" },
    { title: "Sample Blog 2", link: "https://example.com/blog2" }
  ];
}

module.exports = searchGoogle;
