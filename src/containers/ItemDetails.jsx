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
import NotFound from "../components/NotFound";
import Loader from "../components/Loader";

const ItemDetails = () => {
  const BASE_IMG_URI = process.env.REACT_APP_BASE_IMG_URI;
  const { id } = useParams();

  const [notFound, setNotFound] = useState(false);
  const [movie, setMovie] = useState({});
  const [watchProviders, setWatchProviders] = useState([]);
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
    const { fetchDetails, fetchSimilarMovies, fetchWatchProviders } =
      item_requests(id);
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

    const fetchProviders = async () => {
      await axios
        .get(fetchWatchProviders)
        .then((response) => {
          setWatchProviders(response.data.results.IN);
          return response;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchProviders();
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
    let date = new Date(dt).toLocaleDateString();
    date = date.split("/");
    date = `${date[1]}-${date[0]}-${date[2]}`;
    return date;
  };
  const GetChipString = (str) => {
    if (str.length > 20) {
      str = str.substring(0, 20);
      str += "..";
    }
    return str;
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
                      <div className="container">
                        <div className="row">
                          <div className="col-xl-9">
                            <p className="itemdetails__chip__box">
                              <span>Status: </span>
                              <span className="chip__span">
                                {movie?.status} ({GetDate(movie?.release_date)})
                              </span>
                            </p>
                            <p className="itemdetails__chip__box">
                              <span>Languages: </span>
                              {movie.spoken_languages ? (
                                <>
                                  {[...movie?.spoken_languages].map((lang) => {
                                    return (
                                      <span
                                        key={lang.iso_639_1}
                                        className="chip"
                                      >
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
                                  {[...movie?.production_countries].map(
                                    (country) => {
                                      return (
                                        <span
                                          key={country.id}
                                          className="chip"
                                          title={country.name}
                                        >
                                          {GetChipString(country.name)}
                                        </span>
                                      );
                                    }
                                  )}
                                </>
                              ) : (
                                ""
                              )}
                            </p>
                            <p className="itemdetails__chip__box">
                              <span>Production By: </span>
                              {movie.production_companies ? (
                                <>
                                  {[...movie?.production_companies].map(
                                    (company) => {
                                      return (
                                        <span
                                          key={company.id}
                                          className="chip company_chip"
                                          title={company.name}
                                        >
                                          {GetChipString(company.name)}
                                        </span>
                                      );
                                    }
                                  )}
                                </>
                              ) : (
                                ""
                              )}
                            </p>
                            <p className="itemdetails__chip__box">
                              <span>IMDB Id: </span>
                              <span className="chip__span">
                                {movie?.imdb_id}
                              </span>
                            </p>
                          </div>
                          <div className="col-xl-3">
                            <div className="itemdetails__chip__box watch__provider__container">
                              <span className="watch__provider__heading">
                                Watch Providers:{" "}
                              </span>
                              <WatchProviders data={watchProviders} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="related__content__box">
            {relatedMoviesReq !== "" ? (
              <>
                <h4 className="itemdetails__title related__title">
                  <span>Recommended For You</span>
                </h4>
                <ItemsRow
                  title="Related Movies"
                  fetchURI={relatedMoviesReq}
                  isLarge
                  noTitle
                />
              </>
            ) : (
              ""
            )}
          </div>
        </>
      ) : (
        <NotFound />
      )}
    </>
  );
};

const WatchProviders = ({ data }) => {
  const BASE_IMG_URI = process.env.REACT_APP_BASE_IMG_URI;
  const [list, setList] = useState([]);

  useEffect(() => {
    if (!data) return;

    let count = 0,
      flag = false;
    const arr_obj = [];

    for (let key of ["flatrate", "buy"]) {
      if (data[key] && Array.isArray(data[key])) {
        for (let item of data[key]) {
          if (item.logo_path) {
            if (count === 4) {
              flag = true;
              break;
            }
            arr_obj.push(item);
            count++;
          }
        }
        if (flag) break;
      }
    }
    setList(arr_obj);
  }, [data]);

  return (
    <div className="container watch__providers__box">
      <div className="row">
        {[...list].map((provider, idx) => {
          return (
            <div
              className="col-xl-6 col-lg-2 col-md-3 col-sm-2 col-2"
              key={`${idx}_${provider.provider_id}`}
            >
              <img
                src={`${BASE_IMG_URI}${provider.logo_path}`}
                alt={provider.provider_name}
                className="watch__provider__item"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ItemDetails;
