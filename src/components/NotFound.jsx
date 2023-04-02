import React, { useEffect } from "react";
import "../App.css";

// Not Found Media
import NotFoundDesktop from "../media/NotFound/Not_Found.png";
import NotFoundMobile from "../media/NotFound/Not_Found_Mobile.png";

const NotFound = () => {
  useEffect(() => {
    document.title = "404 Not Found | Netflix Clone";
  }, []);

  return (
    <div className="not__found__box">
      <picture>
        <source srcSet={NotFoundDesktop} media="(min-width: 991px)" />
        <img src={NotFoundMobile} className="not__found" alt="Not-Found" />
      </picture>
    </div>
  );
};

export default NotFound;
