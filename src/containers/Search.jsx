import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";
import ItemsGrid from "../components/ItemsGrid";

import axios from "../lib/axios";
import { search_requests } from "../lib/request";

const Search = () => {
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
    <div className="search__container">
      <p className="search__query">
        <span>Search Results for:</span> <span>{query}</span>
      </p>

      {/* Search Items */}
      <ItemsGrid searchItems={searchItems} NavigateToItem={NavigateToItem} />

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
