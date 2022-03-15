import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import axios from "../lib/axios";

// Movie Trailer
import YouTube from "react-youtube";

// Requests
import { item_requests } from "../lib/request";
import ItemsRow from "../components/ItemsRow";
import NotFound from "../components/NotFound";
import Loader from "../components/Loader";

const BASE_IMG_URI = process.env.REACT_APP_BASE_IMG_URI;

const ItemDetails = () => {
  const { id } = useParams();
  const [notFound, setNotFound] = useState(false);

  const [movie, setMovie] = useState({});
  const [watchProviders, setWatchProviders] = useState([]);
  const [screenshots, setScreenshots] = useState([]);
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
    const {
      fetchDetails,
      fetchSimilarMovies,
      fetchWatchProviders,
      fetchImages,
      fetchVideos,
    } = item_requests(id);
    setRelatedMoviesReq(fetchSimilarMovies);

    // Fetch Item Details
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

    // Fetch Item Watch Providers
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

    // Fetch Item Screenshots/Images
    const fetchScreenshots = async () => {
      await axios
        .get(fetchImages)
        .then((response) => {
          setTimeout(() => {
            setScreenshots(response.data);
          }, 2000);
          return response;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    // Fetch Item Videos/Trailer
    const fetchTrailer = async () => {
      setShowTrailer(false);
      await axios
        .get(fetchVideos)
        .then((response) => {
          return response.data.results;
        })
        .then((res) => {
          if (res.length > 0) {
            let backup = res[0],
              flag = false;

            for (let video of res) {
              if (video.key && video.official) backup = video;
              if (video.key && video.official && video.type === "Trailer") {
                setTrailerURL(video);
                flag = true;
                break;
              }
            }

            if (!flag) setTrailerURL(backup);
          }
          setShowTrailer(true);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    // Calling APIs on basis of priorities
    fetchItemDetails().then((response) => {
      fetchProviders();
      fetchScreenshots();
      fetchTrailer();
    });
  }, [id]);

  // Config for Youtube Trailer
  const opts = {
    width: "100%",
    height: 310,
    playerVars: {
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
    <main>
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
                        {movie.genres && (
                          <>
                            {[...movie?.genres].map((genre) => {
                              return (
                                <span key={genre.iso_3166_1} className="chip">
                                  {genre.name}
                                </span>
                              );
                            })}
                          </>
                        )}
                      </p>
                      <p className="itemdetails__chip__box">
                        <span>Languages: </span>
                        {movie.spoken_languages && (
                          <>
                            {[...movie?.spoken_languages].map((lang) => {
                              return (
                                <span key={lang.iso_639_1} className="chip">
                                  {lang.english_name}
                                </span>
                              );
                            })}
                          </>
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
                        <YouTube
                          videoId={trailerURL.key}
                          opts={opts}
                          title={trailerURL.name}
                        />
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
                              {movie.spoken_languages && (
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
                              )}
                            </p>
                            <p className="itemdetails__chip__box">
                              <span>Production Country: </span>
                              {movie.production_countries && (
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
                              )}
                            </p>
                            <p className="itemdetails__chip__box">
                              <span>Production By: </span>
                              {movie.production_companies && (
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

          {/* RELATED CONTENT */}
          <div className="related__content__box">
            {relatedMoviesReq !== "" && (
              <>
                <h4 className="itemdetails__title related__title">
                  Recommended For You
                </h4>
                <ItemsRow
                  title="Related Movies"
                  fetchURI={relatedMoviesReq}
                  isLarge
                  noTitle
                />
              </>
            )}
          </div>

          {/* MOVIE SCREENSHOTS */}
          <div className="movie__screenshots__box">
            <MovieScreenshots data={screenshots} />
          </div>
        </>
      ) : (
        <NotFound />
      )}
    </main>
  );
};

const WatchProviders = ({ data }) => {
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
    <div className="container-fluid watch__providers__box">
      <div className="row">
        {[...list].map((provider, idx) => {
          return (
            <div
              className="col-xl-6 col-lg-2 col-md-3 col-sm-2 col-2 px-0 me-3"
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

const MovieScreenshots = ({ data }) => {
  const [hasImages, setHasImages] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!data) return;
    setHasImages(false);

    let request = "";
    if (data.backdrops && data.backdrops.length > 0) {
      request = "backdrops";
      setHasImages(true);
    } else {
      setHasImages(false);
      return;
    }

    setImages(data[request]);
  }, [data]);

  return (
    <>
      {hasImages ? (
        <div className="container-sm">
          <h4 className="itemdetails__title screenshots__title">Screenshots</h4>

          <div className="container-fluid px-1">
            <div className="row gx-sm-4 gx-3">
              {[...images].map((img, idx) => {
                if (img.file_path && idx < 8)
                  return (
                    <div
                      className="col-xxl-3 col-lg-4 col-sm-6 col-6 mt-4"
                      key={`${idx}_${img.height}`}
                    >
                      <img
                        src={`${BASE_IMG_URI}${img.file_path}`}
                        alt={`Screenshot_${idx + 1}`}
                        loading="lazy"
                      />
                    </div>
                  );
                else return "";
              })}
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ItemDetails;
