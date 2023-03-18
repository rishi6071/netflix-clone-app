import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

// Helpers
import { faqs } from "../lib/request";
import { getLocalStorage, setLocalStorage } from "../lib/localStorage";

// Icons & Media
import HomeBanner from "../media/Banners/home_banner.png";
import TVBanner from "../media/Banners/TV.png";
import MobileBanner from "../media/Banners/mobile.jpg";
import EverywhereBanner from "../media/Banners/Everywhere.png";
import ChildrenBanner from "../media/Banners/children.png";

const Home = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  // user already present then redirect to /browse
  useEffect(() => {
    const user = getLocalStorage("user") || "";
    if (user) navigate("/browse");
  }, [navigate]);

  const handleEmail = (e) => setEmail(e.target.value);
  const NavigateToBrowse = (e) => {
    e.preventDefault();
    setLocalStorage("user", email);
    navigate("/browse");
  };

  return (
    <main>
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
            <p className="home__banner__subtitle">Watch anywhere. Cancel anytime.</p>

            <div className="home__banner__label">
              Ready to watch? Enter your email to create or restart your membership.
            </div>

            <form className="home__banner__form__group" onSubmit={NavigateToBrowse}>
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
                <span>Get Started</span> <i className="bx bx-chevron-right"></i>
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
              Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.
            </p>
          </div>
          <div className="info__banner__img__box">
            <img src={TVBanner} alt="TV-Banner" />
          </div>
        </div>

        {/* Mobile Banner */}
        <div className="info__banner">
          <div className="info__banner__img__box">
            <img src={MobileBanner} alt="Mobile-Banner" loading="lazy" />
          </div>
          <div className="info__banner__content__box">
            <h1 className="info__banner__title">Create profiles for children.</h1>
            <p className="info__banner__desc">
              Send children on adventures with their favourite characters in a space made just for them—free with your
              membership.
            </p>
          </div>
        </div>

        {/* Everywhere Banner */}
        <div className="info__banner flex__order">
          <div className="info__banner__content__box">
            <h1 className="info__banner__title">Watch everywhere.</h1>
            <p className="info__banner__desc">
              Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.
            </p>
          </div>
          <div className="info__banner__img__box">
            <img src={EverywhereBanner} alt="Everywhere-Banner" loading="lazy" />
          </div>
        </div>

        {/* Children Banner */}
        <div className="info__banner">
          <div className="info__banner__img__box">
            <img src={ChildrenBanner} alt="Children-Banner" loading="lazy" />
          </div>
          <div className="info__banner__content__box">
            <h1 className="info__banner__title">Download your shows to watch offline.</h1>
            <p className="info__banner__desc">Save your favourites easily and always have something to watch.</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq__container">
          {faqs.length > 0 && (
            <>
              <h1 className="faq__heading">Frequently Asked Questions</h1>
              <div className="accordion accordion-flush" id="accordionFlushExample">
                {[...faqs].map((faq) => {
                  return (
                    <div className="accordion-item" key={`faq_${faq.id}`}>
                      <h2 className="accordion-header" id={`flush-heading_${faq.id}`}>
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#flush-collapse_${faq.id}`}
                          aria-expanded="false"
                          aria-controls={`flush-collapse_${faq.id}`}
                        >
                          {faq.title}
                        </button>
                      </h2>
                      <div
                        id={`flush-collapse_${faq.id}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`flush-heading_${faq.id}`}
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div
                          className="accordion-body"
                          dangerouslySetInnerHTML={{
                            __html: faq.desc,
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          <div className="home__banner__label faq__form__label">
            Ready to watch? Enter your email to create or restart your membership.
          </div>
          <div className="faq__form__container">
            <form className="home__banner__form__group" onSubmit={NavigateToBrowse}>
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
                <span>Get Started</span> <i className="bx bx-chevron-right"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
