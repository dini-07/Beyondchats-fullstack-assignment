const ArticleCard = ({ article }) => {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
        padding: "20px",
        marginBottom: "20px",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
      }}
    >
      {/* Article Title */}
      <h2 style={{ marginBottom: "6px" }}>
        {article.title}
      </h2>

      {/* Author + Date (Quick Fix #2) */}
      <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "10px" }}>
        {article.author || "BeyondChats"}{" "}
        {article.publishedDate ? `• ${article.publishedDate}` : ""}
      </p>

      {/* Original / Updated Badge */}
      <span
        style={{
          display: "inline-block",
          padding: "4px 10px",
          borderRadius: "6px",
          fontSize: "12px",
          marginBottom: "12px",
          backgroundColor: article.isUpdated ? "#dcfce7" : "#e0e7ff",
          color: "#111827",
        }}
      >
        {article.isUpdated ? "Updated Article" : "Original Article"}
      </span>

      {/* Article Content */}
      <p
        style={{
          marginTop: "12px",
          lineHeight: "1.7",
          color: "#374151",
        }}
      >
        {article.content
          ?.replace(/\s+/g, " ")
          .slice(0, 350)}
        ...
      </p>

      {/* References Section (Only if Updated Article) */}
      {article.references && article.references.length > 0 && (
        <div style={{ marginTop: "16px" }}>
          <h4 style={{ marginBottom: "6px" }}>References</h4>
          <ul>
            {article.references.map((ref, index) => (
              <li key={index}>
                <a
                  href={ref}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#2563eb" }}
                >
                  {ref}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ArticleCard;
