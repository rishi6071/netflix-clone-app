import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

const Banner = ({ bannerData: movie }) => {
  const navigate = useNavigate();
  const BASE_IMG_URI = process.env.REACT_APP_BASE_IMG_URI;

  const NavigateToItem = (id) => navigate(`/item/${id}`);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <>
      {movie && (
        <div
          className="banner__container"
          id={movie?.id}
          style={{
            backgroundSize: "cover",
            backgroundImage: `${
              movie ? `url(${BASE_IMG_URI}${movie?.backdrop_path})` : ""
            }`,
            backgroundPosition: "center center",
          }}
        >
          <div className="banner__box">
            <p className="banner__rating">
              <i className="bx bxs-star"></i> <span>{movie?.vote_average}</span>
            </p>

            <h1 className="banner__title">
              {movie?.title || movie?.name || movie?.original_name}
            </h1>

            <div className="buttons__box">
              <button
                type="button"
                className="banner__button"
                onClick={() => NavigateToItem(movie?.id)}
              >
                <i className="bx bx-play"></i> <span>Play</span>
              </button>
              <button
                type="button"
                className="banner__button"
                onClick={() => NavigateToItem(movie?.id)}
              >
                <i className="bx bx-info-circle"></i>{" "}
                <span id={movie?.id}>More Info</span>
              </button>
            </div>

            <p className="banner__desc">{truncate(movie?.overview, 160)}</p>
          </div>

          <div className="banner__fadebottom"></div>
        </div>
      )}
    </>
  );
};

export default Banner;
