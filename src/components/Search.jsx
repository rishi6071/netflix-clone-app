import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";

import axios from "../lib/axios";
import { search_requests } from "../lib/request";

const Search = () => {
  const BASE_IMG_URI = process.env.REACT_APP_BASE_IMG_URI;
  const navigate = useNavigate();
  const { query } = useParams();

  const [searchItems, setSearchItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const { fetchSearch } = search_requests(query, currentPage);

    const fetchData = async () => {
      await axios
        .get(fetchSearch)
        .then((response) => {
          return response.data;
        })
        .then((res) => {
          setTotalPages(res.total_pages);
          setSearchItems((prevState) => [...prevState, ...res.results]);
          return res;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, [query, currentPage]);

  const NavigateToItem = (event) => {
    alert(event.target.id);
    navigate(`/item/${event.target.id}`);
  };

  const HandleLoadMore = () => {
    setCurrentPage((prevState) => {
      return prevState + 1;
    });
  };

  return (
    <div className="search__container">
      <p className="search__query">
        <span>Search Results for:</span> <span>{query}</span>
      </p>

      {/* Search Items */}
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

      {/* Pagination LOAD MORE */}
      {currentPage < totalPages ? (
        <div className="load__more__box">
          <button type="button" className="btn" onClick={HandleLoadMore}>
            <span>LOAD MORE</span> <i className="bx bx-loader-circle"></i>
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Search;
