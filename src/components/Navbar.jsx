import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../App.css";

// Media
import Netflix from "../media/brand.png";
import Avatar from "../media/avatar.png";

const Navbar = () => {
  const location = useLocation();
  const [showBg, setShowBg] = useState(false);

  useEffect(() => {
    const scrollFun = () => {
      if (window.scrollY > 100) setShowBg(true);
      else setShowBg(false);
    };

    window.addEventListener("scroll", scrollFun);
    return () => {
      window.removeEventListener("scroll", scrollFun);
    };
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-md px-sm-3 px-1 ${
        showBg ? "showBg" : ""
      }`}
    >
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand brand__logo">
          <img src={Netflix} alt="Netflix-Brand" />
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {location.pathname !== "/" ? (
            <>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item ms-md-4 ms-2">
                  <NavLink
                    to="/browse"
                    className="nav-link"
                    aria-current="page"
                  >
                    Browse
                  </NavLink>
                </li>
                <li className="nav-item ms-md-4 ms-2">
                  <NavLink
                    to="/browse"
                    className="nav-link"
                    aria-current="page"
                  >
                    My List
                  </NavLink>
                </li>
              </ul>
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search Movies..."
                  aria-label="Search"
                />
              </form>
            </>
          ) : (
            ""
          )}
          <ul
            className={`navbar-nav ${
              location.pathname === "/" ? "ms-auto" : ""
            }`}
          >
            <li className="nav-item">
              <NavLink to="/" className="navbar-brand avatar__logo">
                <img src={Avatar} alt="Netflix-Brand" />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
