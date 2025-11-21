import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "../../vendor/normalize.css";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MainPage from "../../pages/MainPage/MainPage";
import SavedNewsPage from "../../pages/SavedNewsPage/SavedNewsPage";
import Preloader from "../Preloader/Preloader";
import SignInModal from "../SignInModal/SignInModal";
import SignUpModal from "../SignUpModal/SignUpModal";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import * as auth from "../../utils/auth";
import { getArticles } from "../../utils/api";

function App() {
  // ---------------- STATE ----------------
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);

  // ---------- SAVE ARTICLE ----------
  const handleSaveArticle = (article) => {
    setSavedArticles((prev) => {
      if (prev.some((a) => a.url === article.url)) return prev;
      return [...prev, article];
    });
  };

  // ---------- UNSAVE ARTICLE ----------
  const handleUnsaveArticle = (article) => {
    setSavedArticles((prev) => prev.filter((a) => a.url !== article.url));
  };

  // ---------------- HANDLERS ----------------
  const closeActiveModal = () => setActiveModal("");

  // ---------- SEARCH ----------
  const handleSearch = async (query) => {
    console.log("Searching NewsAPI for:", query);
    setLoading(true);

    try {
      const results = await getArticles(query);
      setArticles(results);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  // ---------- AUTH ----------
  const handleSignUp = ({ name, email, password }) => {
    auth
      .register({ name, email, password })
      .then(() => {
        setActiveModal("success");
      })
      .catch((err) => console.error("Signup failed:", err));
  };

  const handleSignIn = ({ email, password }) => {
    auth
      .authorize({ email, password })
      .then(({ token }) => {
        localStorage.setItem("jwt", token);
        setIsLoggedIn(true);
        closeActiveModal();
        return auth.checkToken(token);
      })
      .then((userData) => setCurrentUser(userData))
      .catch((err) => console.error("Login failed:", err));
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  // ---------- TOKEN VALIDATION ----------
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((userData) => {
          setIsLoggedIn(true);
          setCurrentUser(userData);
        })
        .catch(() => localStorage.removeItem("jwt"));
    }
  }, []);

  // ---------- ESC KEY CLOSE ----------
  useEffect(() => {
    if (!activeModal) return;
    const handleEsc = (e) => e.key === "Escape" && closeActiveModal();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [activeModal]);

  // ---------- PROTECTED ROUTE ----------
  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) return <Navigate to="/" replace />;
    return children;
  };

  // ---------------- RENDER ----------------
  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            onSignInClick={() => setActiveModal("signin")}
            onSignUpClick={() => setActiveModal("signup")}
            onSignOutClick={handleSignOut}
            onSearch={handleSearch}
          />

          <Routes>
            <Route
              path="/"
              element={
                loading ? (
                  <Preloader />
                ) : (
                  <MainPage
                    articles={articles}
                    isLoggedIn={isLoggedIn}
                    savedArticles={savedArticles}
                    onSaveArticle={handleSaveArticle}
                    onUnsave={handleUnsaveArticle}
                  />
                )
              }
            />

            <Route
              path="/saved-news"
              element={
                <ProtectedRoute>
                  <SavedNewsPage
                    savedArticles={savedArticles}
                    onUnsaveArticle={handleUnsaveArticle}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>

          {/* ---------- MODALS ---------- */}
          <SignInModal
            isOpen={activeModal === "signin"}
            onClose={closeActiveModal}
            onSwitchToSignUp={() => setActiveModal("signup")}
            onSignIn={handleSignIn}
          />

          <SignUpModal
            isOpen={activeModal === "signup"}
            onClose={closeActiveModal}
            onSwitchToSignIn={() => setActiveModal("signin")}
            onSignUp={handleSignUp}
          />

          <ModalWithForm
            isOpen={activeModal === "success"}
            onClose={() => setActiveModal("")}
            title="Registration successfully completed!"
            buttonText="Sign in"
            buttonClass="modal__button--signin"
            onSubmit={(e) => {
              e.preventDefault();
              setActiveModal("signin");
            }}
          />
        </div>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
