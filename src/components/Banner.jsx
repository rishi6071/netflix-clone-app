import React, { useState, useEffect } from "react";
import axios from "../lib/axios";
import "../App.css";

const Banner = ({ fetchURI }) => {
  const [movie, setMovie] = useState({});
  const BASE_IMG_URI = process.env.REACT_APP_BASE_IMG_URI;

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(fetchURI)
        .then((response) => {
          return response.data.results;
        })
        .then((res) => {
          setMovie(res[Math.floor(Math.random() * res.length - 1)]);
          return res;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, [fetchURI]);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <>
      {movie ? (
        <div
          className="banner__container"
          style={{
            backgroundSize: "cover",
            backgroundImage: `${
              movie ? `url(${BASE_IMG_URI}${movie?.backdrop_path})` : ""
            }`,
            backgroundPosition: "center center",
          }}
        >
          <div className="banner__box">
            <h1 className="banner__title">
              {movie?.title || movie?.name || movie?.original_name}
            </h1>

            <div className="buttons__box">
              <button type="button" className="banner__button">
                Play
              </button>
              <button type="button" className="banner__button">
                My List
              </button>
            </div>

            <p className="banner__desc">{truncate(movie?.overview, 160)}</p>
          </div>

          <div className="banner__fadebottom"></div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Banner;
