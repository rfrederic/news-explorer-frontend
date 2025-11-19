import "./Preloader.css";
import loading from "../../assets/Ellipse.png";

function Preloader() {
  return (
    <div className="preloader">
      <div className="preloader-content">
        <img src={loading} alt="loading news" className="circle-preloader" />
      </div>
      <p className="preloader-title">Searching for news...</p>
    </div>
  );
}

export default Preloader;
