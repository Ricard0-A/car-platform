import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {" "}
        {/* Flexbox en el container */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <i className="green fa-brands fa-drupal fs-1 "></i>
          <i className="fa-brands fa-stumbleupon fs-2 "></i>
          <h4>DrivenS</h4>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul
            className="navbar-nav mx-auto d-flex flex-column flex-lg-row align-items-lg-center"
            style={{ gap: "50px" }}
          >
            {" "}
            {/* Menú centrado */}
            <li className="nav-item">
              <Link className="nav-link" to="/catalog">
                Catalog
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Features
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Contact Us
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav d-flex align-items-center">
            {" "}
            {/* Login a la derecha */}
            <li className="nav-item">
              <i className="fa-solid fa-right-to-bracket nav-link"></i>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};


export default Navbar;