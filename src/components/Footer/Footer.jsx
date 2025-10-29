import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__title">
        &copy; {new Date().getFullYear()} NewsExplorer by Rigaud Jr. Frederic
      </p>
      <nav className="footer__nav">
        <div className="footer__links"></div>
        <Link to="/" className="footer__link">
          Home
        </Link>
        <div className="footer__social">
          <a
            href="https://github.com/rfrederic"
            target="_blank"
            rel="noreferrer"
            className="footer__icon footer__icon_type_github"
            aria-label="GitHub"
          ></a>
          <a
            href="https://www.linkedin.com/in/rigaudson-frederic-215346375/"
            target="_blank"
            rel="noreferrer"
            className="footer__icon footer__icon_type_linkedin"
            aria-label="LinkedIn"
          ></a>
        </div>
      </nav>
    </footer>
  );
}

export default Footer;
