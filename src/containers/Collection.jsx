import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";
import axios from "../lib/axios";
import requests from "../lib/request";

import ItemsGrid from "../components/ItemsGrid";

const Collection = () => {
  const navigate = useNavigate();
  const { collection } = useParams();

  const [searchItems, setSearchItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetch_req = requests(currentPage)[`${collection}`];

    const fetchData = async () => {
      await axios
        .get(fetch_req)
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
  }, [collection, currentPage]);

  const HandleLoadMore = () => {
    setCurrentPage((prevState) => {
      return prevState + 1;
    });
  };

  const NavigateToItem = (event) => {
    const id = event.target.id;
    navigate(`/item/${id ? id : "null"}`);
  };

  const GetCollectionHead = (coll_name) => {
    const str = coll_name.replace("fetch", "");
    const result = str.split(/(?=[A-Z])/);
    return result.join(" ");
  };

  return (
    <div className="search__container">
      <p className="search__query">
        <span>Collection for:</span>{" "}
        <span>{GetCollectionHead(collection)}</span>
      </p>

      {/* Collection Items */}
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

export default Collection;
