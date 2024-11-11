import React from "react";
import { Link } from "react-router-dom";

interface Props {
  isLoggedIn: boolean;
}

function Home({ isLoggedIn }: Props) {
  const renderHeroLink = () => {
    if (isLoggedIn) {
      return (
        <Link to="/projects" className="hero-button">
          Get started
        </Link>
      );
    } else {
      return (
        <Link to="/register" className="hero-button">
          Get started
        </Link>
      );
    }
  };

  return (
    <>
      <section className="hero">
        <h1>
          Proje<span>X</span>
        </h1>
        <p>The ultimate project management system</p>
        {renderHeroLink()}
      </section>
      <section className="intro">
        <div>
          <i className="fa fa-plus"></i>
          <h2>Create Project</h2>
          <p>Create a new project with your team members!</p>
          <button>Read More</button>
        </div>
        <div className="intro-different-color">
          <i className="fa fa-list"></i>
          <h2>Add Tasks</h2>
          <p>Add tasks to your project and assign them to your team members.</p>
          <button>Read More</button>
        </div>
        <div>
          <i className="fa fa-smile-o"></i>
          <h2>Be Productive</h2>
          <p>Enjoy the productive workflow with a more organized overview.</p>
          <button>Read More</button>
        </div>
      </section>
      <section className="learn-more learn-more-dark">
        <img src="/Svgs/undraw_dev_productivity.svg" alt="how it works" />
        <div>
          <h1>
            Learn <span>More</span>
          </h1>
          <h2>Lorem ipsum dolor sit amet.</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea,
            dolorem voluptatem impedit incidunt inventore vitae?
          </p>
          <button className="hero-button">Read More</button>
        </div>
      </section>
      <section className="learn-more">
        <div>
          <h1>How it works</h1>
          <h2>Lorem ipsum dolor sit amet.</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea,
            dolorem voluptatem impedit incidunt inventore vitae?
          </p>
          <button className="hero-button">Read More</button>
        </div>
        <img src="/Svgs/undraw_scrum_board.svg" alt="how it works" />
      </section>
      <section className="news-letter">
        <h2>Sign up for our news letter</h2>
        <div>
          <input type="text" />
          <button>Subscribe</button>
        </div>
      </section>
    </>
  );
}

export default Home;
