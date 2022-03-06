import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

// Media
import Netflix from "../media/brand.png";
import Avatar from "../media/avatar.png";

const Navbar = () => {
  const [showBg, setShowBg] = useState(false);

  useEffect(() => {
    const scrollFun = () => {
      if (window.scrollY > 150) setShowBg(true);
      else setShowBg(false);
    };

    window.addEventListener("scroll", scrollFun);
    return () => {
      window.removeEventListener("scroll", scrollFun);
    };
  }, []);

  return (
    <header className={`navbar ${showBg ? "showBg" : ""}`}>
      <div className="brand__logo">
        <Link to="/">
          <img src={Netflix} alt="Netflix-Brand" />
        </Link>
      </div>
      <div className="avatar__logo">
        <Link to="/">
          <img src={Avatar} alt="Avatar" />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
