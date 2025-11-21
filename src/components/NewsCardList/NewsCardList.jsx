import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";

function NewsCardList({
  articles,
  isLoggedIn,
  savedArticles,
  onSave,
  onUnsave,
}) {
  return (
    <div className="cards">
      {articles.map((article) => {
        const isSaved = savedArticles?.some((a) => a.url === article.url);

        return (
          <NewsCard
            key={article.url}
            article={article}
            isLoggedIn={isLoggedIn}
            isSaved={isSaved}
            onSave={onSave}
            onUnsave={onUnsave}
          />
        );
      })}
    </div>
  );
}

export default NewsCardList;
