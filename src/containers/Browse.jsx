import React, { useState, useEffect, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import "../App.css";

// Custom Components
import Loader from "../components/Loader";
import Banner from "../components/Banner";

// requests
import requests from "../lib/request";
import { getFromCache, setInCache } from "../lib/cache";

const ItemsRow = lazy(() => import("../components/ItemsRow"));

const Browse = () => {
  const navigate = useNavigate();

  const [rowsData, setRowsData] = useState([]);

  // fetch all collections including banner
  useEffect(() => {
    // set the document's title
    document.title = "Home | Netflix Clone";

    const randomPageNo = Math.floor(Math.random() * 5 + 1);
    const api_requests = requests(randomPageNo);

    const fetchCollections = async (api_requests) => {
      // already in cache
      const cache_data = getFromCache("homepage");
      if (cache_data) {
        setRowsData(cache_data);
        return;
      }

      if (Object.keys(api_requests)?.length > 0) {
        // request with api-result
        const results = [];

        const promises = [];
        for (let api in api_requests) {
          results.push(api_requests[api]);
          promises.push(axios.get(api_requests[api]?.url));
        }
        const values = await Promise.all([...promises]);

        // combining request with request-result
        for (let i = 0; i < results.length; i++) {
          results[i]["data"] = values[i]?.data?.results;
        }

        setInCache("homepage", results);
        setRowsData(results);
      }
    };

    fetchCollections(api_requests);
  }, []);

  return (
    <main>
      {rowsData?.length > 0 ? (
        <div className="">
          {/* Home Banner */}
          {rowsData && rowsData[0] && rowsData[0]["data"]?.length > 0 && (
            <Banner
              bannerData={
                rowsData[0]["data"][Math.floor(Math.random() * 6) + 1]
              }
            />
          )}

          {/* Collection Rows */}
          <div className="all_rows__container">
            {[...rowsData].map((row, idx) => {
              // show only 8 collections
              if (idx >= 8) return "";

              return (
                <Suspense fallback={<></>}>
                  <ItemsRow
                    key={row?.id}
                    id={row?.id}
                    title={row?.title}
                    data={row?.data}
                    callPos={idx}
                    isLarge={
                      row?.id === "fetchNetflixOriginals" ||
                      row?.id === "fetchIndianMovies"
                        ? true
                        : false
                    }
                  />
                </Suspense>
              );
            })}
          </div>

          <div className="more__collections">
            <button type="button" onClick={() => navigate("/collections")}>
              More Collections
            </button>
          </div>
        </div>
      ) : (
        <div className="py-5">
          <Loader />
        </div>
      )}
    </main>
  );
};

export default Browse;
