import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

// Media
import Netflix from "../media/brand.png";
import Avatar from "../media/avatar.png";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="brand__logo">
        <img src={Netflix} alt="Netflix-Brand" />
      </div>
      <div className="avatar__logo">
        <img src={Avatar} alt="Avatar" />
      </div>
    </header>
  );
};

export default Navbar;
