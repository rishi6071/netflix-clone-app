import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

// axios & requests
import axios from "axios";
import { faq_request } from "../lib/request";

// Icons & Media
import HomeBanner from "../media/home_banner.png";
import TVBanner from "../media/TV.png";
import MobileBanner from "../media/mobile.jpg";
import EverywhereBanner from "../media/Everywhere.png";
import ChildrenBanner from "../media/children.png";

const Home = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(faq_request)
        .then((response) => {
          return response.data.data;
        })
        .then((res) => {
          setFaqs(res);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

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

      {/* FAQ Section */}
      <div className="faq__container">
        {faqs.length > 0 ? (
          <>
            <h1 className="faq__heading">Frequently Asked Questions</h1>
            <div
              className="accordion accordion-flush"
              id="accordionFlushExample"
            >
              {[...faqs].map((faq) => {
                return (
                  <div className="accordion-item" key={`faq_${faq.id}`}>
                    <h2
                      className="accordion-header"
                      id={`flush-heading_${faq.id}`}
                    >
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
        ) : (
          ""
        )}

        <div className="faq__form__container">
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
              <span>Get Started</span> <i className="bx bx-chevron-right"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
