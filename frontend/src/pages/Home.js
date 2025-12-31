import { useEffect, useState } from "react";
import { fetchArticles } from "../services/api";
import ArticleCard from "../components/ArticleCard";

const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles()
      .then(res => setArticles(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{maxWidth: "900px",
  margin: "auto",
  padding: "20px",
  background: "#f9fafb" }}>
      <h1>BeyondChats Articles</h1>
      {articles.map(article => (
        <ArticleCard key={article._id} article={article} />
      ))}
    </div>
  );
};

export default Home;
