import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid d-flex justify-content-between align-items-center">
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
              <li className="nav-item">
                <Link className="nav-link" to="/catalog">
                  Catalog
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Sell your Car
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact-us">
                  Contact Us
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav d-flex align-items-center">
              <li className="nav-item">
                <Link className="nav-link" to="#" onClick={handleModalToggle}>
                  <i className="fa-solid fa-right-to-bracket nav-link"></i>
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div
        // Solo si aparece el dropdown activa el css Show... otherwise ""
        className={`modal-custom ${showModal ? "show" : ""}`}
        tabIndex="-1"
        onClick={handleModalToggle}  // Cierra al hacer clic FUERA del contenido
      >
        <div
          className="modal-dialog modal-dialog-centered"
          style={{ maxWidth: "500px" }}
          onClick={(e) => e.stopPropagation()} // Evita el cierre al hacer clic EN el contenido
        >
          <div
            className="modal-content"
            style={{
              padding: "11px",
              minHeight: "350px",
              border: "6px solid darkslategray",
            }}
          >
            <div
              className="modal-header"
              style={{
                borderBottom: "none",
                position: "relative",
                color: "#1B1D3B",
              }}
            >
              <h5
                className="modal-title text-center w-100"
                style={{ fontSize: "2.3rem", fontFamily: "serif" }}
              >
                Choose Your Role
              </h5>
              <button
                type="button"
                className="btn-close"
                style={{ position: "absolute", top: "10px", right: "10px" }}
                onClick={handleModalToggle}
              ></button>
            </div>
            <div
              className="modal-body d-flex flex-column justify-content-around align-items-center"
              style={{ gap: "20px" }}
            >
              <Link
                className="btn btn-primary w-75 d-flex align-items-center justify-content-center"
                style={{
                  padding: "15px",
                  fontSize: "1.2rem",
                  fontFamily: "sans-serif",
                  backgroundColor: "seagreen",
                }}
                to="/login-buyer"
                onClick={handleModalToggle}
              >
                <i className="fa-solid fa-user me-2"></i>
                Login as Buyer
              </Link>
              <Link
                className="btn btn-secondary w-75 d-flex align-items-center justify-content-center"
                style={{
                  padding: "15px",
                  fontSize: "1.2rem",
                  fontFamily: "sans-serif",
                  backgroundColor: "darkred",
                }}
                to="/login-dealer"
                onClick={handleModalToggle}
              >
                <i className="fa-solid fa-business-time me-2"></i>
                Login as Dealer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
