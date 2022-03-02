import React, { useState, useEffect } from "react";
import "../App.css";

// Media
import Netflix from "../media/brand.png";
import Avatar from "../media/avatar.png";

const Navbar = () => {
  const [showBg, setShowBg] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) setShowBg(true);
      else setShowBg(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <header className={`navbar ${showBg ? "showBg" : ""}`}>
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
