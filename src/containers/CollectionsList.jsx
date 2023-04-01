import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// requests
import requests from "../lib/request";

const CollectionsList = () => {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const collections_obj = requests();

    const arr = [];
    for (let col in collections_obj) {
      if (collections_obj[col].hasOwnProperty("genre")) arr.push(collections_obj[col]);
    }

    setCollections([...arr]);
  }, []);

  return (
    <main>
      <div className="container pt-5 collections__box">
        <div className="row gx-xl-4 gx-3 pt-sm-5 pt-4">
          {[...collections].map((collection, idx) => {
            return (
              <div
                className="col-lg-4 col-sm-6 col-12 mb-sm-3 mb-2"
                key={`collection_${idx + 1}`}
                onClick={() => {
                  navigate(`/collection/${collection.id}`);
                }}
              >
                <div className="collection__item">
                  <img src={collection?.img} alt={collection.id} />
                  <h6>{collection?.genre}</h6>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default CollectionsList;
