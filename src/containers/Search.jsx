import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";

import { STATUSES } from "../App";
import Loader from "../components/Loader";
import ItemsGrid from "../components/ItemsGrid";

// requests
import axios from "../lib/axios";
import { search_requests } from "../lib/request";

const Search = () => {
  const navigate = useNavigate();
  const { query } = useParams();

  const [searchItems, setSearchItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSearchLoading, setIsSearchLoading] = useState(STATUSES.IDLE);

  useEffect(() => {
    document.title = `Search - ${query.charAt(0).toUpperCase() + query.slice(1)} | Netflix Clone`;
    setSearchItems([]);
  }, [query]);

  useEffect(() => {
    const { fetchSearch } = search_requests(query, currentPage);

    const fetchData = async () => {
      setIsSearchLoading(STATUSES.LOADING);

      await axios
        .get(fetchSearch)
        .then((response) => {
          return response.data;
        })
        .then((res) => {
          setTotalPages(res.total_pages);
          setSearchItems((prevState) => [...prevState, ...res.results]);
          
          setTimeout(() => {
            setIsSearchLoading(STATUSES.IDLE);
          }, 500);
          return res;
        })
        .catch((error) => {
          setIsSearchLoading(STATUSES.ERROR);
          console.log(error);
        });
    };
    fetchData();
  }, [query, currentPage]);

  const NavigateToItem = (event, item_id) => {
    event.stopPropagation();
    navigate(`/item/${item_id ? item_id : "null"}`);
  };

  const HandleLoadMore = () => {
    setCurrentPage((prevState) => {
      return prevState + 1;
    });
  };

  return (
    <main>
      <div className="search__container">
        <p className="search__query">
          <span>Search Results for:</span> <span>{query}</span>
        </p>

        {isSearchLoading !== STATUSES.LOADING ? (
          <>
            {/* Search Items */}
            <ItemsGrid searchItems={searchItems} NavigateToItem={NavigateToItem} />

            {/* Pagination LOAD MORE */}
            {currentPage < totalPages && (
              <div className="load__more__box">
                <button type="button" className="btn" onClick={HandleLoadMore}>
                  <span>LOAD MORE</span> <i className="bx bx-loader-circle"></i>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="py-5">
            <Loader />
          </div>
        )}
      </div>
    </main>
  );
};

export default Search;
