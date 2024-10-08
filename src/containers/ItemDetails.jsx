import React, { useState, useEffect, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import axios from "../lib/axios";

// Requests
import { item_requests } from "../lib/request";
import NotFound from "../components/NotFound";
import Loader from "../components/Loader";
import { STATUSES } from "../App";
import { IMAGE_LOADING } from "../utils/common";

const ItemsRow = lazy(() => import("../components/ItemsRow"));
const YouTube = lazy(() => import("react-youtube"));

const BASE_IMG_URI = process.env.REACT_APP_BASE_IMG_URI;

const ItemDetails = () => {
  const { id } = useParams();
  const [notFound, setNotFound] = useState(false);

  const [movie, setMovie] = useState({});
  const [watchProviders, setWatchProviders] = useState([]);
  const [screenshots, setScreenshots] = useState([]);
  const [credits, setCredits] = useState([]);
  const [isTrailerLoading, setIsTrailerLoading] = useState(STATUSES.IDLE);
  const [trailerURL, setTrailerURL] = useState("");
  const [currentSection, setCurrentSection] = useState("overview");
  const [relatedMovies, setRelatedMovies] = useState([]);

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
      fetchCredits,
    } = item_requests(id);

    // Fetch Item Details
    const fetchItemDetails = async () => {
      await axios
        .get(fetchDetails)
        .then((res) => {
          document.title = `${
            res.data?.name || res.data?.title || "Item Details"
          } | Netflix Clone`;
          setMovie(res.data);
          return res;
        })
        .catch((error) => {
          console.log(error);
          setNotFound(true);
        });
    };

    // Fetch Recommended Items
    const fetchRelatedMovies = async () => {
      await axios
        .get(fetchSimilarMovies)
        .then((res) => {
          setRelatedMovies(res.data.results);
          return res;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // Fetch Item Watch Providers
    const fetchProviders = async () => {
      await axios
        .get(fetchWatchProviders)
        .then((res) => {
          setWatchProviders(res.data.results.IN);
          return res;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    // Fetch Item Screenshots/Images
    const fetchScreenshots = async () => {
      await axios
        .get(fetchImages)
        .then((res) => {
          setTimeout(() => {
            setScreenshots(res.data);
          }, 2000);
          return res;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    // Fetch Item Videos/Trailer
    const fetchTrailer = async () => {
      setIsTrailerLoading(STATUSES.LOADING);
      await axios
        .get(fetchVideos)
        .then((res) => {
          return res.data.results;
        })
        .then((res) => {
          if (res.length > 0) {
            let backup = res[0],
              flag = false;

            for (let video of res) {
              if (video.key && video.official) backup = video;
              if (
                video.key &&
                video.type === "Trailer" &&
                (video.official || video.name.includes("Official Trailer"))
              ) {
                setTrailerURL(video);
                flag = true;
                break;
              }
            }

            if (!flag) setTrailerURL(backup);
            setIsTrailerLoading(STATUSES.IDLE);
          } else {
            setIsTrailerLoading(STATUSES.ERROR);
          }
        })
        .catch((error) => {
          setIsTrailerLoading(STATUSES.ERROR);
          console.log(error);
        });
    };

    // Fetch Item Cast/Credits
    const fetchCastCredits = async () => {
      await axios
        .get(fetchCredits)
        .then((res) => {
          const tmp = res.data?.cast;
          if (tmp.length > 0) setCredits(tmp.slice(0, 5));
          return res;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    // Calling APIs on basis of priorities
    fetchItemDetails().then(() => {
      fetchRelatedMovies();
      fetchProviders();
      fetchScreenshots();
      fetchCastCredits();
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
      str = str.substring(0, 18);
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
                referrerPolicy="no-referrer"
                className="itemdetails__img"
                alt={movie?.title || movie?.original_title}
                loading="eager"
              />
              <div className="itemdetails__fadebottom"></div>
            </div>

            <div className="itemdetails__content__box">
              <div className="itemdetails__title__rating__box">
                <h2 className="itemdetails__title">
                  {movie?.title || movie?.original_title}
                </h2>
                <h6 className="itemdetails__rating">
                  <span>{movie?.vote_average?.toFixed(1)}</span>{" "}
                  <i className="bx bxs-star"></i>
                </h6>
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
                    Trailers <span>&amp; More</span>
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
                        <span>Cast: </span>
                        {credits && (
                          <>
                            {[...credits].map((cast, idx) => {
                              return (
                                <span
                                  key={`cast_${idx + 1}_${cast.id}`}
                                  className="chip cc__chip"
                                >
                                  {cast.original_name}
                                </span>
                              );
                            })}
                          </>
                        )}
                      </p>
                      <p className="itemdetails__chip__box">
                        <span>Genre: </span>
                        {movie?.genres && (
                          <>
                            {[...movie?.genres].map((genre, idx) => {
                              return (
                                <span
                                  key={`genre_${idx + 1}_${genre.iso_3166_1}`}
                                  className="chip cc__chip"
                                >
                                  {genre.name}
                                </span>
                              );
                            })}
                          </>
                        )}
                      </p>
                      <p className="itemdetails__chip__box">
                        <span>Languages: </span>
                        {movie?.spoken_languages && (
                          <>
                            {[...movie?.spoken_languages].map((lang, idx) => {
                              return (
                                <span
                                  key={`language_${idx + 1}_${lang.iso_639_1}`}
                                  className="chip mb-2"
                                >
                                  {lang.english_name}
                                </span>
                              );
                            })}
                          </>
                        )}
                      </p>
                    </section>
                  ) : currentSection === "trailers" ? (
                    <section>
                      {/* TRAILERS & MORE SECTION */}
                      {isTrailerLoading === STATUSES.LOADING ? (
                        <Loader />
                      ) : isTrailerLoading === STATUSES.IDLE ? (
                        <Suspense fallback={<></>}>
                          <YouTube
                            videoId={trailerURL?.key}
                            opts={opts}
                            title={trailerURL?.name}
                          />
                        </Suspense>
                      ) : (
                        <div className="h-100 d-flex justify-content-center align-items-center">
                          <div className="d-flex align-items-center gap-2 text-white-50">
                            <i
                              style={{ fontSize: "25px" }}
                              className="bx bx-error-circle"
                            ></i>
                            <h6 style={{ transform: "translateY(2px)" }}>
                              No Trailer Found!
                            </h6>
                          </div>
                        </div>
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
                              <span>Popularity: </span>
                              <span className="chip__span text-white">
                                <i className="bx bxs-star"></i>{" "}
                                {movie?.vote_average} ({movie?.vote_count})
                              </span>
                            </p>
                            <p className="itemdetails__chip__box">
                              <span>Production Country: </span>
                              {movie.production_countries && (
                                <>
                                  {[...movie?.production_countries].map(
                                    (country, idx) => {
                                      return (
                                        <span
                                          key={`country_${idx + 1}_${
                                            country.id
                                          }`}
                                          className="chip cc__chip"
                                          title={country.name}
                                        >
                                          {country.name}
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
                                    (company, idx) => {
                                      return (
                                        <span
                                          key={`company_${idx + 1}_${
                                            company.id
                                          }`}
                                          className="chip cc__chip"
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
                              <Suspense fallback={<></>}>
                                <WatchProviders data={watchProviders} />
                              </Suspense>
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
            {relatedMovies?.length > 0 && (
              <>
                <h4 className="itemdetails__title related__title">
                  Recommended For You
                </h4>
                <Suspense fallback={<></>}>
                  <ItemsRow
                    title="Related Movies"
                    data={relatedMovies}
                    isLarge
                    noTitle
                  />
                </Suspense>
              </>
            )}
          </div>

          {/* MOVIE SCREENSHOTS */}
          <div className="movie__screenshots__box">
            <Suspense fallback={<></>}>
              <MovieScreenshots data={screenshots} />
            </Suspense>
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
              key={`provider_${idx + 1}_${provider.provider_id}`}
            >
              <img
                src={`${BASE_IMG_URI}${provider.logo_path}`}
                referrerPolicy="no-referrer"
                alt={provider.provider_name}
                className="watch__provider__item"
                loading={IMAGE_LOADING.LAZY}
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
  const [modalImgURL, setModalImgURL] = useState("");
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
                if (img?.file_path && idx < 8)
                  return (
                    <div
                      className="col-lg-4 col-sm-6 col-12 mt-4"
                      key={`screenshot_${idx}_${img.height}`}
                    >
                      <img
                        src={`${BASE_IMG_URI}${img.file_path}`}
                        className="screenshot__item"
                        referrerPolicy="no-referrer"
                        alt={`Screenshot_${idx + 1}`}
                        data-bs-toggle="modal"
                        data-bs-target="#screenshotModal"
                        onClick={() => {
                          setModalImgURL(`${BASE_IMG_URI}${img.file_path}`);
                        }}
                        loading={IMAGE_LOADING.LAZY}
                      />
                    </div>
                  );
                else return <div key={idx}></div>;
              })}
            </div>
          </div>

          {/* Modal */}
          <div
            className="modal fade"
            id="screenshotModal"
            tabIndex="-1"
            aria-labelledby="screenshotLabel"
            aria-hidden="true"
          >
            <button
              type="button"
              className="close__btn"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              X
            </button>

            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">
                  <img src={modalImgURL} alt="Screenshot Modal" />
                </div>
              </div>
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
