import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";

import { STATUSES } from "../App";
import Loader from "../components/Loader";
import ItemsGrid from "../components/ItemsGrid";

// requests
import requests from "../lib/request";
import axios from "../lib/axios";

const Collection = () => {
  const navigate = useNavigate();
  const { collection } = useParams();

  const [searchItems, setSearchItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isCollectionLoading, setIsCollectionLoading] = useState(STATUSES.IDLE);

  useEffect(() => {
    const fetch_req = requests(currentPage)[`${collection}`];
    document.title = `${fetch_req?.title || "Collection"} | Netflix Clone`;

    const fetchData = async () => {
      setIsCollectionLoading(STATUSES.LOADING);

      await axios
        .get(fetch_req?.url)
        .then((response) => {
          return response.data;
        })
        .then((res) => {
          setTotalPages(res.total_pages);
          setSearchItems((prevState) => [...prevState, ...res.results]);

          setTimeout(() => {
            setIsCollectionLoading(STATUSES.IDLE);
          }, 500);
          return res;
        })
        .catch((err) => {
          setIsCollectionLoading(STATUSES.ERROR);
          console.log(err);
        });
    };
    fetchData();
  }, [collection, currentPage]);

  const HandleLoadMore = () => {
    setCurrentPage((prevState) => {
      return prevState + 1;
    });
  };

  const NavigateToItem = (event, item_id) => {
    event.stopPropagation();
    navigate(`/item/${item_id ? item_id : "null"}`);
  };

  const GetCollectionHead = (coll_name) => {
    const str = coll_name.replace("fetch", "");
    const result = str.split(/(?=[A-Z])/);
    return result.join(" ");
  };

  return (
    <main>
      <div className="search__container">
        <p className="search__query">
          <span>Collection for:</span> <span>{GetCollectionHead(collection)}</span>
        </p>

        {isCollectionLoading !== STATUSES.LOADING ? (
          <>
            {/* Collection Items */}
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

export default Collection;
