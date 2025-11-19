import "./About.css";
import authorPicture from "../../assets/author-picture.jpeg";

function About() {
  return (
    <section className="about">
      <img
        src={authorPicture}
        alt="Rigaudson Frederic Jr."
        className="about__photo"
      />
      <div className="about__content">
        <h1 className="about__title">About the Author</h1>
        <p className="about__text">
          Hi! I'm Rigaud Jr. Frederic a Fullstack Developer and Software
          Engineering student at <strong>TripleTen</strong>. I create responsive
          web applications using
          <strong> React</strong>, <strong>JavaScript</strong>,
          <strong> HTML5</strong>, and <strong>CSS3</strong>.
        </p>
        <p className="about__text">
          During my time at TripleTen, I learned to build dynamic user
          interfaces, integrate APIs, and write clean, reusable code. I’m
          passionate about bringing designs to life with attention to detail and
          a focus on user experience.
        </p>
      </div>
    </section>
  );
}

export default About;
