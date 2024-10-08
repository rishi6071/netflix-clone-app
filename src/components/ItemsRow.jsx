import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { IMAGE_LOADING } from "../utils/common";

const ItemsRow = ({
  id: collection_name,
  title,
  data: movies,
  isLarge,
  noTitle,
  callPos = 0,
}) => {
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
            <Link
              to={`/collection/${collection_name}`}
              className="item__row__header"
            >
              <span>{title}</span>
              <i className="bx bx-link"></i>
            </Link>
          )}

          <div className="container-fluid items__box">
            {[...movies].map((movie, idx) => {
              if (idx > 9) return "";

              if (
                (isLarge && movie.poster_path) ||
                (!isLarge && movie.backdrop_path)
              )
                return (
                  <div
                    className={`item__wrapper ${
                      isLarge ? "large__poster" : ""
                    }`}
                  >
                    <img
                      key={movie?.id}
                      id={movie.id}
                      src={`${BASE_IMG_URI}${
                        isLarge
                          ? `${movie.poster_path}`
                          : `${movie.backdrop_path}`
                      }`}
                      className="item__img"
                      alt={movie.original_name}
                      onClick={(event) => NavigateToItem(event, `${movie.id}`)}
                      loading={
                        callPos < 2 ? IMAGE_LOADING.EAGER : IMAGE_LOADING.LAZY
                      }
                    />
                  </div>
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
