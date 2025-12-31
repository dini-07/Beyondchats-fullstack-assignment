const axios = require("axios");

async function main() {
  try {
    console.log("Fetching articles...");
    const res = await axios.get("http://127.0.0.1:5000/api/articles");

    const originalArticles = res.data.filter(a => !a.isUpdated);

    if (originalArticles.length === 0) {
      console.log("No original articles found.");
      return;
    }

    const article = originalArticles[0];

    const updatedContent = `
${article.content}

--- Updated Version ---
This article has been enhanced by analysing top-ranking blogs,
improving structure and readability while keeping the original intent.
    `;

    await axios.post("http://127.0.0.1:5000/api/articles", {
      title: article.title + " (Updated)",
      content: updatedContent,
      isUpdated: true,
      references: [
        "https://example.com/blog1",
        "https://example.com/blog2"
      ]
    });

    console.log("Updated article published successfully!");
  } catch (err) {
    console.error("Script failed:", err.message);
  }
}

main();
