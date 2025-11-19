import React from "react";
import NewsCardList from "../../components/NewsCardList/NewsCardList";
import "./SavedNewsPage.css";

function SavedNewsPage({ savedArticles, onUnsaveArticle }) {
  return (
    <main className="saved-news">
      <h2 className="saved_articles__title">Saved Articles</h2>

      <NewsCardList
        articles={savedArticles}
        isLoggedIn={true}
        savedArticles={savedArticles}
        onSave={() => {}}
        onUnsave={onUnsaveArticle}
      />
    </main>
  );
}

export default SavedNewsPage;
