import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";


const Navbar = () => {
  const { actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null); //New

  useEffect(() => {
    const token = localStorage.getItem('token'); // Verifica si hay token en localStorage
    setIsLoggedIn(!!token); // Actualiza el estado isLoggedIn
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    // Obtener datos del usuario (incluido el avatar) del localStorage
    if (token) {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          setAvatarUrl(user.avatar); // Accede a user.avatar
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    }
  }, [localStorage.getItem('token')]);


  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
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

          <div className="collapse navbar-collapse" id="navbarNav" style={{ marginLeft: "100px" }}>
            <ul className="navbar-nav me-auto" style={{ gap: "64px" }}>
              <li className="nav-item">
                <Link className="nav-link" to="/catalog">
                  Catalog
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sell-your-car">
                  Join as Seller
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact-us">
                  Contact Us
                </Link>
              </li>
              {isLoggedIn && (
                <li className="nav-item">
                  <Link className="nav-link" to="/gallery">
                    My Dream Rides
                  </Link>
                </li>
              )}
            </ul>

            <ul className="navbar-nav ms-auto">
              <li className="nav-item d-flex align-items-center" style={{ marginLeft: '10px' }}> {/* Margen a la izquierda */}
                {isLoggedIn && avatarUrl && (
                  <Link to="/profile">
                    <img
                      src={avatarUrl}
                      alt="Avatar"
                      style={{
                        width: '50px',
                        height: '45px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        marginRight: '20px',
                        verticalAlign: 'middle',
                        border: "3px solid seagreen"
                      }}
                    />
                  </Link>
                )}
                {isLoggedIn ? (
                  <Link className="nav-link" to="#" onClick={actions.logOut}>
                    <i className="me-2 fa-solid fa-right-from-bracket"></i>
                    <span>Log Out</span>
                  </Link>
                ) : (
                  <Link className="nav-link" to="#" onClick={handleModalToggle}>
                    <i className="me-2 fa-solid fa-right-to-bracket nav-link"></i>
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div
        className={`modal-custom ${showModal ? "show" : ""}`}
        tabIndex="-1"
        onClick={handleModalToggle}
      >
        <div
          className="modal-dialog modal-dialog-centered"
          style={{ maxWidth: "500px" }}
          onClick={(e) => e.stopPropagation()}
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
                to="/login"
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
                to="/login/sellers"
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