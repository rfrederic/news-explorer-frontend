import { Link } from "react-router-dom";
import "./Navigation.css";
import logoutIcon from "../../assets/logout.svg";

function Navigation({ isLoggedIn, onSignInClick, onLogOutClick, currentUser }) {
  return (
    <nav className="nav">
      <div className="nav__links">
        <Link to="/" className="nav__link">
          Home
        </Link>
        {isLoggedIn && (
          <Link to="/saved-news" className="nav__link">
            Saved articles
          </Link>
        )}
      </div>

      <div className="nav__actions">
        {isLoggedIn ? (
          <button className="nav__button" onClick={onLogOutClick}>
            {currentUser?.name || ""} <img src={logoutIcon} alt="Logout" />
          </button>
        ) : (
          <button onClick={onSignInClick} className="nav__button">
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
