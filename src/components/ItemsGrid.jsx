import React from "react";
import "../App.css";

const ItemsGrid = ({ searchItems, NavigateToItem }) => {
  const BASE_IMG_URI = process.env.REACT_APP_BASE_IMG_URI;

  return (
    <div className="container-fluid search__items__box">
      <div className="row gx-1">
        {[...searchItems].map((item) => {
          if (item.poster_path) {
            return (
              <div
                className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4"
                key={item.id}
              >
                <div
                  className="card search__item"
                  id={item.id}
                  onClick={NavigateToItem}
                >
                  <img
                    src={`${BASE_IMG_URI}${item.poster_path}`}
                    className="card-img-top"
                    alt={item.original_name}
                  />
                  <div className="card-body">
                    <p className="card-text">
                      {item?.title || item?.name || item?.original_name}
                    </p>
                  </div>
                </div>
              </div>
            );
          }
          return "";
        })}
      </div>
    </div>
  );
};

export default ItemsGrid;
