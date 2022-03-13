import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../lib/axios";
import requests, { getKeyByValue } from "../lib/request";

const ItemsRow = ({ title, fetchURI, isLarge, noTitle }) => {
  const navigate = useNavigate();
  const BASE_IMG_URI = process.env.REACT_APP_BASE_IMG_URI;
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(fetchURI)
        .then((response) => {
          setMovies(response.data.results);
          return response;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, [fetchURI]);

  const NavigateToItem = (event) => {
    const id = event.target.id;
    navigate(`/item/${id ? id : "null"}`);
  };

  // LOGIC for Link Component (to get the collection_name on the basis of api_request)
  const req_obj = requests(1);
  const collection_name = getKeyByValue(req_obj, fetchURI);

  return (
    <div className="items__row__box">
      {!noTitle ? (
        <Link
          to={`/collection/${collection_name}`}
          className="item__row__header"
        >
          {title}
        </Link>
      ) : (
        ""
      )}

      <div className="container-fluid items__box">
        {[...movies].map((movie) => {
          if (
            (isLarge && movie.poster_path) ||
            (!isLarge && movie.backdrop_path)
          )
            return (
              <img
                key={movie?.id}
                id={movie.id}
                src={`${BASE_IMG_URI}${
                  isLarge ? `${movie.poster_path}` : `${movie.backdrop_path}`
                }`}
                className={`item__img ${isLarge ? "large__poster" : ""}`}
                alt={movie.original_name}
                onClick={NavigateToItem}
              />
            );
          return "";
        })}
      </div>
    </div>
  );
};

export default ItemsRow;
