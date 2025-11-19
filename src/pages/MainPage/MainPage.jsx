import React, { useState } from "react";
import "./MainPage.css";
import NewsCardList from "../../components/NewsCardList/NewsCardList";
import About from "../../components/About/About";
import Preloader from "../../components/Preloader/Preloader";

function MainPage({
  articles,
  loading,
  isLoggedIn,
  savedArticles,
  onSaveArticle,
  onUnsaveArticle,
}) {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleShowMore = () => setVisibleCount((prev) => prev + 3);

  return (
    <main className="main">
      {loading ? (
        <Preloader />
      ) : articles.length > 0 ? (
        <section className="results">
          <h2 className="results__title">Search results</h2>
          <NewsCardList
            articles={articles.slice(0, visibleCount)}
            isLoggedIn={isLoggedIn}
            savedArticles={savedArticles}
            onSave={onSaveArticle}
            onUnsave={onUnsaveArticle}
          />
          {visibleCount < articles.length && (
            <button className="results__button" onClick={handleShowMore}>
              Show more
            </button>
          )}
        </section>
      ) : (
        <p className="no-results">No articles found. Try searching for news.</p>
      )}
      <About />
    </main>
  );
}

export default MainPage;
