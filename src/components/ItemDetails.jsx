import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import axios from "../lib/axios";

// Custom Components

const ItemDetails = () => {
  const API_KEY = process.env.REACT_APP_PUBLIC_KEY;
  const BASE_IMG_URI = process.env.REACT_APP_BASE_IMG_URI;
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const item_requests = {
      fetchDetails: `/movie/${id}?api_key=${API_KEY}`,
    };

    const fetchItemDetails = async () => {
      await axios
        .get(item_requests.fetchDetails)
        .then((response) => {
          setMovie(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchItemDetails();
  }, [id, API_KEY]);

  return (
    <>
      <img
        src={`${BASE_IMG_URI}${movie?.backdrop_path}`}
        style={{ width: "100%", height: "auto" }}
        alt=""
      />
    </>
  );
};

export default ItemDetails;
