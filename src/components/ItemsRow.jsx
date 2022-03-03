import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../lib/axios";

const ItemsRow = ({ title, fetchURI, isLarge }) => {
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

  const NavigateToItem = (event) => navigate(`/item/${event.target.id}`);

  return (
    <div className="items__row__box">
      <h2 className="item__row__header">{title}</h2>

      <div className="items__box">
        {[...movies].map((movie) => {
          return (
            <img
              key={movie?.id}
              id={movie?.id}
              src={`${BASE_IMG_URI}${
                isLarge ? `${movie.poster_path}` : `${movie.backdrop_path}`
              }`}
              className={`item__img ${isLarge ? "large__poster" : ""}`}
              alt={movie.original_name}
              onClick={NavigateToItem}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ItemsRow;
