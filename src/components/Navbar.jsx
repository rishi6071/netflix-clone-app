import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "../App.css";

// Media
import Netflix from "../media/Icons/brand.png";
import Avatar from "../media/Icons/avatar.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showBg, setShowBg] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const scrollFun = () => {
      let coord = 0,
        path = location.pathname;
      if (path === "/") coord = 300;
      else if (path.startsWith("/browse")) coord = 200;
      else coord = 5;

      if (window.scrollY > coord) setShowBg(true);
      else setShowBg(false);
    };

    window.addEventListener("scroll", scrollFun);
    return () => {
      window.removeEventListener("scroll", scrollFun);
    };
  }, [location]);

  const SubmitSearch = (event) => {
    event.preventDefault();
    setQuery("");
    navigate(`/search/${query}`);
  };

  return (
    <header>
      {/* Navbar */}
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
            aria-expanded="false"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
            aria-label="Toggle navigation"
          >
            <i className="bx bx-menu-alt-right"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {location.pathname !== "/" ? (
              <>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item ms-md-4 ms-2">
                    <NavLink
                      to="/browse"
                      className={`nav-link ${
                        location.pathname.startsWith("/browse")
                          ? "active__navlink"
                          : ""
                      }`}
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
                <form className="d-flex" onSubmit={SubmitSearch}>
                  <input
                    className="form-control me-2"
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
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

      {/* Sidebar */}
      <div
        className="offcanvas offcanvas-start sidebar__menu"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            <img src={Netflix} alt="Netflix-Brand" />
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <i className="bx bx-x"></i>
          </button>
        </div>
        <div className="offcanvas-body">
          <form
            className="d-flex justify-content-center"
            onSubmit={SubmitSearch}
          >
            <input
              className="form-control me-2"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search Movies..."
              aria-label="Search"
            />
          </form>
          <ul className="list-group">
            <li className="list-group-item"></li>
            <li className="list-group-item">
              <NavLink
                to="/browse"
                className={`nav-link ${
                  location.pathname.startsWith("/browse")
                    ? "active__navlink"
                    : ""
                }`}
                data-bs-dismiss="offcanvas"
              >
                Browse
              </NavLink>
            </li>
            <li className="list-group-item">
              <NavLink
                to="/"
                className={`nav-link`}
                data-bs-dismiss="offcanvas"
              >
                My List
              </NavLink>
            </li>
            <li className="list-group-item mt-2">
              <NavLink
                to="/"
                className="navbar-brand avatar__logo"
                data-bs-dismiss="offcanvas"
              >
                <img src={Avatar} alt="Netflix-Brand" />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
