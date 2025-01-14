import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="navbar-brand d-flex ">
          <div className="ms-3 d-flex ">
            <i className="green fa-brands fa-drupal fs-1"></i>
            <i className="fa-brands fa-stumbleupon fs-2"></i>
            <h4>DrivenS</h4>
            {/* mb-0 para evitar espaciado vertical */}
          </div>
        </div>

        {/* Botón de hamburguesa */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navGround"
          aria-controls="navGround"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Todo lo que va a colapsar */}
        <div className="collapse navbar-collapse text-center" id="navGround">
          <div className="w-100 d-flex justify-content-center">
            {/* PRIMER UL de mi navbar */}
            <ul className="nav-left navbar-nav" style={{ gap: "50px" }}>
              <li className="nav-item">
                <Link className="nav-link" to="/">
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
          </div>

          {/* Segundo Ul para ms-auto (Extrema derecha) */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item pt-2">
              <i className="fa-solid fa-right-to-bracket"></i>
            </li>
            <li className="nav-item log">
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
