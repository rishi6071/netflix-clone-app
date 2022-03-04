import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import axios from "../lib/axios";

// Item Requests
import { item_requests } from "../lib/request";

const ItemDetails = () => {
  const API_KEY = process.env.REACT_APP_PUBLIC_KEY;
  const BASE_IMG_URI = process.env.REACT_APP_BASE_IMG_URI;
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const requests = item_requests(id, API_KEY);

    const fetchItemDetails = async () => {
      await axios
        .get(requests.fetchDetails)
        .then((response) => {
          setMovie(response.data);
          // console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchItemDetails();
  }, [id, API_KEY]);

  const ShiftSection = () => {};

  // Utility Methods
  const GetRunTime = (runtime) =>
    `${(runtime / 60).toFixed(0)}h ${runtime % 60}min`;
  const IsAdultContent = (adult) => `${adult ? "16+" : "All"}`;
  const GetPosterPath = (path) => `${BASE_IMG_URI}${path}`;

  return (
    <div className="itemdetails__container" id={movie?.id}>
      <div className="itemdetails__img__box">
        <img
          src={GetPosterPath(movie?.poster_path)}
          className="itemdetails__img"
          alt={movie?.title || movie?.original_title}
        />
      </div>

      <div className="itemdetails__content__box">
        <div className="itemdetails__title__rating__box">
          <h1 className="itemdetails__title">
            {movie?.title || movie?.original_title}
          </h1>
          <h3 className="itemdetails__rating">
            <span>{movie?.vote_average}</span> <i className="bx bxs-star"></i>
          </h3>
        </div>

        <div className="itemdetails__meta__info">
          <span>{movie.release ? movie.release.substr(0, 4) : ""}</span>{" "}
          <span>{GetRunTime(movie?.runtime)}</span>{" "}
          <span>{IsAdultContent(movie?.adult)}</span>
        </div>

        <div className="itemdetails__nav__container">
          <div className="itemdetails__nav__tabs">
            <button type="button" id="overview" onClick={ShiftSection}>
              Overview
            </button>
            <button type="button" id="trailers" onClick={ShiftSection}>
              Trailers & More
            </button>
            <button type="button" id="more-like-this" onClick={ShiftSection}>
              More Like This
            </button>
            <button type="button" id="details" onClick={ShiftSection}>
              Details
            </button>
          </div>

          <div className="itemdetails__nav__sections">
            <p className="itemdetails__tagline">
              <span>Tagline: </span>
              {movie?.tagline}
            </p>
            <p className="itemdetails__desc">{movie?.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
