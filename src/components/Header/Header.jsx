import "./Header.css";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import logo from "../../assets/News-explorer.svg";

import menulogo from "../../assets/menu.svg";
import { useEffect, useState } from "react";

function Header({
  isLoggedIn,
  currentUser,
  onSearch,
  onSignInClick,
  onSignUpClick,
  onSignOutClick,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 550);
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 550) {
        // setShowMenu(true);
        setIsMobile(false);
      } else {
        setIsMobile(true);
      }
    });
  }, []);

  return (
    <header className="header">
      <div
        className={`header__top ${
          isMobile && showMenu ? "header__top_fixed" : ""
        }`}
      >
        <Link to="/" className="header__logo-link">
          <img src={logo} alt="NewsExplorer logo" className="header__logo" />
        </Link>
        <button
          className="header__menu-btn"
          onClick={() => setShowMenu(!showMenu)}
        >
          <img src={menulogo} alt="menu logo" />
        </button>

        {(showMenu && isMobile) || !isMobile ? (
          <Navigation
            onSignInClick={onSignInClick}
            onSignUpClick={onSignUpClick}
            isLoggedIn={isLoggedIn}
            onLogOutClick={onSignOutClick}
            currentUser={currentUser}
          />
        ) : (
          <></>
        )}
      </div>

      <div className="header__content">
        <h1 className="header__title">What's going on in the world?</h1>
        <p className="header__subtitle">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <form
          className="header__form"
          onSubmit={(e) => {
            e.preventDefault();
            onSearch?.(e.target.topic.value);
          }}
        >
          <input
            type="text"
            name="topic"
            placeholder="Enter topic"
            className="header__input"
            required
          />
          <button type="submit" className="header__button">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}

export default Header;
