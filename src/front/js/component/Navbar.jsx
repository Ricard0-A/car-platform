import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../../styles/navbar.css";

const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logAlert, setLogAlert] = useState(false) // depende de esto que se muestre toast
  const [fadeOut, setFadeOut] = useState(false)  //  false === show ,


  useEffect(() => {
    if (store.login) {
      setLogAlert(true);
      setFadeOut(false);

      const fadeTimer = setTimeout(() => {
        setFadeOut(true);
      }, 2000);

      const timer = setTimeout(() => {
        setLogAlert(false);
      }, 2500);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(timer);
      };
    }
  }, [store.login]);

  // Este useEffect es para los usuarios logeados!
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
  }, [localStorage.getItem('token')]); // Una vez al iniciar y cada vez 
  // que esto cambia


  const handleModalToggle = () => {
    setShowModal(!showModal);
  };


  const location = useLocation();
  const pathdenied = ["/login", "/register", "seller/cars/get"]

  if (pathdenied.some(path => location.pathname.includes(path))) {
    return null;
  }

  return (
    <>
      <nav className="nav-container navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container-fluid">
          {/* Antes de los ul siempre el navbar brand y boton de colapso */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img className="main-logo" src="/my-logo-fix.png" alt="Logo img" height={50} width={220} />
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
          {/* Todo esto colapsara! */}
          <div className="collapse navbar-collapse" id="navbarNav" style={{ marginLeft: "75px" }}>
            <ul className="navbar-nav me-auto" style={{ gap: "42px" }}>
              <li className="nav-item">
                <Link className="nav-link" to="/catalog">
                  Catalog
                </Link>
              </li>
              <li className="nav-item">
                <div className="navbar__ball mt-3"></div>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/" onClick={opendrop}>
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <div className="navbar__ball mt-3"></div>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link" to="#" onClick={handleModalToggle}>
                  Join as Seller
                </Link>
              </li>
              <li className="nav-item">
                <div className="navbar__ball mt-3"></div>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact-us">
                  Contact Us
                </Link>
              </li>
              {isLoggedIn && (
                <li className="nav-item" >
                  <Link className="nav-link" to="/gallery">
                    My Dream Rides
                  </Link>
                </li>
              )}
            </ul>

            <ul className="navbar-nav nav-login ms-auto">
              <li className="nav-item d-flex align-items-center" style={{ marginLeft: '10px' }}>
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
                    <i className="fa-solid fa-right-from-bracket"></i>
                    <span>Log Out</span>
                  </Link>
                ) : (
                  <Link className="nav-link" to="/login" style={{ fontFamily: "Roboto" }}>
                    <i className="fa-solid fa-right-to-bracket nav-link"></i>
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* TOAST 1  */}
      {logAlert && (
        <div
          className={`alert alert-success position-fixed start-50 translate-middle-x mt-3 fade ${fadeOut ? "" : "show"}`}
          role="alert"
          style={{ zIndex: "9999", padding: "22px", borderRadius: "11px", top: "4.5rem", boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.2)" }}
        >
          <h5 style={{ fontFamily: "cursive, sans-serif" }}> Login successful !</h5>
        </div>
      )}

      {/* MODAL WINDOW 2  */}
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
              minHeight: "210px",
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
              <button
                type="button"
                className="btn-close"
                style={{ position: "absolute", top: "10px", right: "10px" }}
                onClick={handleModalToggle}
              ></button>
            </div>
            <div
              className="modal-body d-flex  justify-content-around align-items-center"
              style={{ gap: "20px", top: '-12px' }}
            >
              <Link
                className="btn btn-primary w-75 d-flex align-items-center justify-content-center"
                style={{
                  padding: "15px",
                  fontSize: "1.2rem",
                  fontFamily: "sans-serif",
                  backgroundColor: "seagreen",
                }}
                to="/sell-your-car"
                onClick={handleModalToggle}
              >
                <i className="fa-solid fa-user me-2"></i>
                Become a Seller
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
                Login as Seller
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;