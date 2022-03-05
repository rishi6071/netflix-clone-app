import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

// Icons & Media
import HomeBanner from "../media/home_banner.png";
import TVBanner from "../media/TV.png";
import MobileBanner from "../media/mobile.jpg";
import EverywhereBanner from "../media/Everywhere.png";
import ChildrenBanner from "../media/children.png";

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
      {/* Get Started Banner */}
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

      {/* TV Banner */}
      <div className="info__banner flex__order">
        <div className="info__banner__content__box">
          <h1 className="info__banner__title">Enjoy on your TV.</h1>
          <p className="info__banner__desc">
            Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray
            players and more.
          </p>
        </div>
        <div className="info__banner__img__box">
          <img src={TVBanner} alt="TV-Banner" />
        </div>
      </div>

      {/* Mobile Banner */}
      <div className="info__banner">
        <div className="info__banner__img__box">
          <img src={MobileBanner} alt="Mobile-Banner" />
        </div>
        <div className="info__banner__content__box">
          <h1 className="info__banner__title">Create profiles for children.</h1>
          <p className="info__banner__desc">
            Send children on adventures with their favourite characters in a
            space made just for them—free with your membership.
          </p>
        </div>
      </div>

      {/* Everywhere Banner */}
      <div className="info__banner flex__order">
        <div className="info__banner__content__box">
          <h1 className="info__banner__title">Watch everywhere.</h1>
          <p className="info__banner__desc">
            Stream unlimited movies and TV shows on your phone, tablet, laptop,
            and TV.
          </p>
        </div>
        <div className="info__banner__img__box">
          <img src={EverywhereBanner} alt="Everywhere-Banner" />
        </div>
      </div>

      {/* Children Banner */}
      <div className="info__banner">
        <div className="info__banner__img__box">
          <img src={ChildrenBanner} alt="Children-Banner" />
        </div>
        <div className="info__banner__content__box">
          <h1 className="info__banner__title">
            Download your shows to watch offline.
          </h1>
          <p className="info__banner__desc">
            Save your favourites easily and always have something to watch.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
