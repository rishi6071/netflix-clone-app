import React from "react";
import { useNavigate, Link } from "react-router-dom";

const ItemsRow = ({ id: collection_name, title, data: movies, isLarge, noTitle, callPos = 0 }) => {
  const navigate = useNavigate();
  const BASE_IMG_URI = process.env.REACT_APP_BASE_IMG_URI;

  const NavigateToItem = (event, item_id) => {
    event.stopPropagation();
    navigate(`/item/${item_id ? item_id : "null"}`);
  };

  return (
    <div className="items__row__box">
      {movies?.length > 0 && (
        <>
          {!noTitle && (
            <Link to={`/collection/${collection_name}`} className="item__row__header">
              {title}
            </Link>
          )}

          <div className="container-fluid items__box">
            {[...movies].map((movie) => {
              if ((isLarge && movie.poster_path) || (!isLarge && movie.backdrop_path))
                return (
                  <img
                    key={movie?.id}
                    id={movie.id}
                    src={`${BASE_IMG_URI}${isLarge ? `${movie.poster_path}` : `${movie.backdrop_path}`}`}
                    className={`item__img ${isLarge ? "large__poster" : ""}`}
                    alt={movie.original_name}
                    onClick={(event) => NavigateToItem(event, `${movie.id}`)}
                    loading={callPos < 2 ? "eager" : "lazy"}
                  />
                );
              return "";
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default ItemsRow;
