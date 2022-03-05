import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

// Media
import HomeBanner from "../media/home_banner.png";

const Home = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleEmail = (event) => setEmail(event.target.value);
  const NavigateToBrowse = (event) => {
    event.preventDefault();
    navigate("/browse");
  };

  return (
    <div className="home__container">
      <div
        className="home__banner__container"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(${HomeBanner})`,
          backgroundPosition: "center center",
        }}
      >
        <div className="home__banner__content__box">
          <h1 className="home__banner__title">
            Unlimited movies, TV <br />
            shows and more.
          </h1>
          <p className="home__banner__subtitle">
            Watch anywhere. Cancel anytime.
          </p>

          <div className="home__banner__label">
            Ready to watch? Enter your email to create or restart your
            membership.
          </div>

          <form
            className="home__banner__form__group"
            onSubmit={NavigateToBrowse}
          >
            <input
              type="email"
              id="getStartedInput"
              name="getStartedInput"
              value={email}
              onChange={handleEmail}
              placeholder="Email Address..."
              required
            />
            <button type="submit" className="getStartedButton">
              <span>Get Started</span> <i class="bx bx-chevron-right"></i>
            </button>
          </form>
        </div>

        <div className="banner__fadebottom"></div>
      </div>
    </div>
  );
};

export default Home;
