import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import axios from "../lib/axios";

// Movie Trailer
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

// Requests
import { item_requests } from "../lib/request";
import ItemsRow from "../components/ItemsRow";

// Not Found Media
import NotFound from "../media/NotFound/Not_Found.png";

import Loader from "../components/Loader";

const ItemDetails = () => {
  const BASE_IMG_URI = process.env.REACT_APP_BASE_IMG_URI;
  const { id } = useParams();

  const [notFound, setNotFound] = useState(false);
  const [movie, setMovie] = useState({});
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerURL, setTrailerURL] = useState("");
  const [currentSection, setCurrentSection] = useState("overview");
  const [relatedMoviesReq, setRelatedMoviesReq] = useState("");

  useEffect(() => {
    if (id === "null") {
      setNotFound(true);
      return;
    }

    window.scrollTo(0, 0);
    const { fetchDetails, fetchSimilarMovies } = item_requests(id);
    setRelatedMoviesReq(fetchSimilarMovies);

    const fetchItemDetails = async () => {
      await axios
        .get(fetchDetails)
        .then((response) => {
          setMovie(response.data);
          setTrailerURL(response.data.name || response.data.title || "");
          return response;
        })
        .catch((error) => {
          console.log(error);
          setNotFound(true);
        });
    };
    fetchItemDetails();
  }, [id]);

  useEffect(() => {
    if (Object.keys(movie).length === 0) return;
    setShowTrailer(false);
    movieTrailer(movie?.name || movie?.title || "")
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerURL(urlParams.get("v"));
      })
      .catch((error) => {
        console.log(error);
      });

    // Show Trailer after 2 Seconds
    setTimeout(() => {
      setShowTrailer(true);
    }, 2000);
  }, [movie]);

  const opts = {
    width: "100%",
    height: 310,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  // Utility Methods
  const GetDuration = (t) => `${(t / 60).toFixed(0)}h ${t % 60}min`;
  const GetPosterPath = (path) => `${BASE_IMG_URI}${path}`;
  const GetReleaseYear = (date) => `${date ? date.split("-")[0] : ""}`;
  const ShiftSection = (event) => setCurrentSection(event.target.id);
  const GetDate = (dt) => {
    const date = new Date(dt).toLocaleDateString();
    return date.replace("/", "-").replace("/", "-");
  };

  return (
    <>
      {!notFound ? (
        <>
          <div className="itemdetails__container" id={movie?.id}>
            <div className="itemdetails__img__box">
              <img
                src={GetPosterPath(movie?.poster_path)}
                className="itemdetails__img"
                alt={movie?.title || movie?.original_title}
              />
              <div className="itemdetails__fadebottom"></div>
            </div>

            <div className="itemdetails__content__box">
              <div className="itemdetails__title__rating__box">
                <h2 className="itemdetails__title">
                  {movie?.title || movie?.original_title}
                </h2>
                <h5 className="itemdetails__rating">
                  <span>{movie?.vote_average}</span>{" "}
                  <i className="bx bxs-star"></i>
                </h5>
              </div>

              <div className="itemdetails__meta__info">
                <span>{GetReleaseYear(movie?.release_date)}</span>
                <span>{GetDuration(movie?.runtime)}</span>
                <span>16+</span>
              </div>

              <div className="itemdetails__nav__container">
                <div className="itemdetails__nav__tabs">
                  <button
                    type="button"
                    id="overview"
                    className={
                      currentSection === "overview" ? "activeSection" : ""
                    }
                    onClick={ShiftSection}
                  >
                    Overview
                  </button>
                  <button
                    type="button"
                    id="trailers"
                    className={
                      currentSection === "trailers" ? "activeSection" : ""
                    }
                    onClick={ShiftSection}
                  >
                    Trailers & More
                  </button>
                  <button
                    type="button"
                    id="details"
                    className={
                      currentSection === "details" ? "activeSection" : ""
                    }
                    onClick={ShiftSection}
                  >
                    Details
                  </button>
                </div>

                <div className="itemdetails__nav__sections">
                  {currentSection === "overview" ? (
                    <section>
                      {/* OVERVIEW SECTION */}
                      <p className="itemdetails__tagline">{movie?.tagline}</p>
                      <p className="itemdetails__desc">{movie?.overview}</p>
                      <p className="itemdetails__chip__box">
                        <span>Genre: </span>
                        {movie.genres ? (
                          <>
                            {[...movie?.genres].map((genre) => {
                              return (
                                <span key={genre.iso_3166_1} className="chip">
                                  {genre.name}
                                </span>
                              );
                            })}
                          </>
                        ) : (
                          ""
                        )}
                      </p>
                      <p className="itemdetails__chip__box">
                        <span>Languages: </span>
                        {movie.spoken_languages ? (
                          <>
                            {[...movie?.spoken_languages].map((lang) => {
                              return (
                                <span key={lang.iso_639_1} className="chip">
                                  {lang.english_name}
                                </span>
                              );
                            })}
                          </>
                        ) : (
                          ""
                        )}
                      </p>
                      <p className="itemdetails__chip__box">
                        <span>Popularity: </span>
                        <span className="chip__span text-white">
                          <i className="bx bxs-star"></i> {movie?.vote_average}{" "}
                          ({movie?.vote_count})
                        </span>
                      </p>
                    </section>
                  ) : currentSection === "trailers" ? (
                    <section>
                      {/* TRAILERS & MORE SECTION */}
                      {showTrailer ? (
                        <YouTube videoId={trailerURL} opts={opts} />
                      ) : (
                        <Loader />
                      )}
                    </section>
                  ) : (
                    <section>
                      {/* DETAILS SECTION */}
                      <p className="itemdetails__chip__box">
                        <span>Status: </span>
                        <span className="chip__span">{movie?.status}</span>
                      </p>
                      <p className="itemdetails__chip__box">
                        <span>Release Date: </span>
                        <span className="chip__span">
                          {GetDate(movie?.release_date)}
                        </span>
                      </p>
                      <p className="itemdetails__chip__box">
                        <span>Languages: </span>
                        {movie.spoken_languages ? (
                          <>
                            {[...movie?.spoken_languages].map((lang) => {
                              return (
                                <span key={lang.iso_639_1} className="chip">
                                  {lang.english_name}
                                </span>
                              );
                            })}
                          </>
                        ) : (
                          ""
                        )}
                      </p>
                      <p className="itemdetails__chip__box">
                        <span>Production Country: </span>
                        {movie.production_countries ? (
                          <>
                            {[...movie?.production_countries].map((country) => {
                              return (
                                <span key={country.id} className="chip">
                                  {country.name}
                                </span>
                              );
                            })}
                          </>
                        ) : (
                          ""
                        )}
                      </p>
                      <p className="itemdetails__chip__box">
                        <span>Production Companies: </span>
                        {movie.production_companies ? (
                          <>
                            {[...movie?.production_companies].map((company) => {
                              return (
                                <span key={company.id} className="chip">
                                  {company.name}
                                </span>
                              );
                            })}
                          </>
                        ) : (
                          ""
                        )}
                      </p>
                      <p className="itemdetails__chip__box">
                        <span>IMDB Id: </span>
                        <span className="chip__span">{movie?.imdb_id}</span>
                      </p>
                    </section>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="related__content__box">
            <h4 className="itemdetails__title related__title">
              <span>Recommended For You</span>
            </h4>
            {relatedMoviesReq !== "" ? (
              <ItemsRow
                title="Related Movies"
                fetchURI={relatedMoviesReq}
                isLarge
                noTitle
              />
            ) : (
              ""
            )}
          </div>
        </>
      ) : (
        <div className="not__found__box">
          <img src={NotFound} className="not__found" alt="Not-Found" />
        </div>
      )}
    </>
  );
};

export default ItemDetails;
