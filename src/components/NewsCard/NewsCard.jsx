import { useLocation } from "react-router-dom";
import "./NewsCard.css";

function NewsCard({ article, isLoggedIn, onSave, onUnsave, isSaved }) {
  const location = useLocation();
  const isSavedPage = location.pathname === "/saved-news";

  function handleBookmarkClick() {
    if (!isLoggedIn) {
      const tooltip = document.querySelector(".card__tooltip");
      if (tooltip) {
        tooltip.style.opacity = 1;
        tooltip.style.visibility = "visible";
        setTimeout(() => {
          tooltip.style.opacity = 0;
          tooltip.style.visibility = "hidden";
        }, 2000);
      }
      return;
    }

    if (isSaved) {
      onUnsave(article);
    } else {
      onSave(article);
    }
  }

  function handleDeleteClick() {
    onUnsave(article);
  }

  return (
    <article className="card">
      {/* ---------- KEYWORD TAG (ONLY SAVED PAGE) ---------- */}
      {isSavedPage && (
        <span className="card__keyword">{article.keyword || "General"}</span>
      )}

      {/* ---------- IMAGE + BUTTONS ---------- */}
      <div className="card__image-container">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="card__link"
        >
          <img
            src={article.urlToImage}
            alt={article.title}
            className="card__image"
          />
        </a>

        {/* BOOKMARK (default view) */}
        {/* {!isSavedPage && ( */}
        <button
          className={`card__bookmark ${isSaved ? "card__bookmark_active" : ""}`}
          onClick={handleBookmarkClick}
        >
          {!isLoggedIn && (
            <span className="card__tooltip">Sign in to save articles</span>
          )}
        </button>
        {/* )} */}

        {/* DELETE BUTTON (only in saved page) */}
        {isSavedPage && (
          <button
            className="card__delete-button"
            onClick={handleDeleteClick}
            aria-label="Delete article"
          ></button>
        )}
      </div>

      {/* ---------- CONTENT ---------- */}
      <div className="card__content">
        <p className="card__date">
          {new Date(article.publishedAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>

        <a href={article.url} target="_blank" rel="noopener noreferrer">
          <h3 className="card__title">{article.title}</h3>
        </a>
        <p className="card__description">{article.description}</p>
        <p className="card__source">{article.source?.name}</p>
      </div>
    </article>
  );
}

export default NewsCard;
