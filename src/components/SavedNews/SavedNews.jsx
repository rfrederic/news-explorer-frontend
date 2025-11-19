import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./SavedNews.css";

export default function SavedNews({ savedArticles = [], onUnsave }) {
  return (
    <section className="saved">
      <h2 className="saved__title">Saved articles</h2>

      {savedArticles.length === 0 ? (
        <p className="saved__empty">You haven't saved any articles yet.</p>
      ) : (
        <ul className="saved__list">
          {savedArticles.map((article) => (
            <li key={article._id}>
              <NewsCard
                article={article}
                isLoggedIn={true}
                isSaved={true}
                onSave={() => {}}
                onUnsave={onUnsave}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
