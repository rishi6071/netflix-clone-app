import React, { useState, useLayoutEffect } from "react";
import axios from "../lib/axios";

const ItemsRow = ({ title, fetchURI, isLarge }) => {
  const BASE_IMG_URI = process.env.REACT_APP_BASE_IMG_URI;
  const [movies, setMovies] = useState([]);

  useLayoutEffect(() => {
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

  return (
    <div className="items__row__box">
      <h2 className="item__row__header">{title}</h2>

      <div className="items__box">
        {[...movies].map((movie) => {
          return (
            <img
              key={movie.id}
              src={`${BASE_IMG_URI}${
                isLarge ? `${movie.poster_path}` : `${movie.backdrop_path}`
              }`}
              className={`item__img ${isLarge ? "largePoster" : ""}`}
              alt={movie.original_name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ItemsRow;
