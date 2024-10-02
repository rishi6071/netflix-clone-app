import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// requests
import requests from "../lib/request";

const CollectionsList = () => {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const collections_obj = requests();
    document.title = "Collections | Netflix Clone";

    const arr = [];
    for (let col in collections_obj) {
      if (collections_obj[col].hasOwnProperty("genre")) {
        arr.push(collections_obj[col]);
      }
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
                className="col-lg-3 col-md-4 col-6 mb-sm-3 mb-2"
                key={`collection_${idx + 1}`}
                onClick={() => {
                  navigate(`/collection/${collection.id}`);
                }}
              >
                <div className="collection__item">
                  <div className="collection__img__wrapper">
                    <img
                      src={collection?.img}
                      alt={collection.id}
                      loading="eager"
                    />
                  </div>
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
