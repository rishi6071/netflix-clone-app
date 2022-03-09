import React from "react";
import "../App.css";

const Loader = () => {
  return (
    <div className="section__loading">
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
