// Importaciones importantes
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import backgroundCar from "../../img/WF.jpg";
import backgroundCarTwo from "../../img/backgroundCarTwo.jpg";

import suv from "../../img/category/suv.png";
import hatchback from "../../img/category/hatchback.png";
import sport from "../../img/category/sport.png";
import sedan from "../../img/category/sedan.png";

import ford1 from "../../img/suggested/ford-1.jpg"; // id: 82769

// Extra 
import safeShield from "../../img/safe-shield.png"

import "../../styles/home.css";

export const Home = () => {
  // Lógica extra antes del return
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  // const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const [shouldReload, setShouldReload] = useState(true);

  // ------------------------------------------------------------------------------------------



  // Uso de favoritos 
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      actions.loadFavorites();
    }
  }, [actions.loadFavorites]);

  // useEffect(() => {
  //   setFavorites(store.favorites);
  // }, [store.favorites]); 

  // ------------------------------------------------------------------------------------------


  // Funcion para lllegar a filtros del catalog y ejecutarlo desde su barra de busqueda
  // (Este useEffect modifica la URL de catalog!) 
  const handleSearch = () => {
    if (searchTerm) {
      const params = new URLSearchParams();
      params.append('search', searchTerm);
      navigate(`/catalog?${params.toString()}`);
    } else {
      alert("Please enter a search term.");
    }
  };


  // Logica para llegar hasta el filtro Type Car 
  const handleCategoryClick = (carType) => {
    const params = new URLSearchParams();
    params.append('carType', carType);
    navigate(`/catalog?${params.toString()}`);
  };
  // Lo mismo pero para location(dealerships)
  const handleDealershipClick = (dealershipName) => {
    const params = new URLSearchParams();
    params.append("location", dealershipName);
    navigate(`/catalog?${params.toString()}`);
  };

  const firstImg = {
    background: `url(${backgroundCar}) center/cover`,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    backgroundBlendMode: "overlay",
  };
  const inputMod = {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: "20px 0 0 20px",
    padding: "10px 20px",
    position: "relative",
    top: "-150px",
  };
  const buttonMod = {
    fontWeight: "400",
    backgroundColor: "rgb(27, 177, 104)",
    border: "none",
    padding: "10px 20px",
    borderRadius: "0 20px 20px 0", // Redondea solo bordes derechos
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    position: "relative",
    top: "-150px",
  };

  const renderRecommendedCars = (cars) => (
    <>
      {cars.map((car) => (
        <Link to={`/car-detail/${car.id}`} style={{ textDecoration: 'none', color: 'inherit' }} >
          <div className="position-relative" key={car.id}  >
            <div className="favorites">
              <i
                className={`fs-4 fa-regular fa-heart ${store.favorites.some(fav => fav.car_id === car.id) ? 'fa-solid filled' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  actions.addFavorite(car.id);
                }}
              />
            </div>
            <img src={car.model_picture || ford1} alt="Car" />
            <h6>{car.model_type}</h6>
            <h2>{car.model_make_id}</h2>
            <h5>{car.model_name}</h5>
            <br />
            <h5 className="year-km-1">
              {car.model_year || "2022"}
              <span className="mx-2">&#8226;</span>
              <i className="me-2 fa-solid fa-droplet"></i>
              {car.model_color}
            </h5>
            <h5 className="location-1 pt-2">
              <i className="fa-solid fa-location-dot"></i> DrivenS {car.dealership}
            </h5>
            <div className="price d-flex justify-content-around mt-4">
              <h5> $ {car.model_previous_price}</h5>
              <div className="price-line"></div>
              <h5>$ {car.model_price}</h5>
            </div>
          </div>
        </Link>))}
    </>
  );

  return (
    <>
      <div className="container-fluid vh-100">
        {/* PRIMERA ROW */}
        <div
          className="row first-row justify-content-center align-items-center"
          style={firstImg}
        >
          <div className="col-12 col-md-8 text-center position-relative">
            {/* Contenedor para input y su button */}
            <div className="d-flex justify-content-center">
              <input
                type="text"
                className="form-control"
                placeholder="What car are you looking for?"
                style={inputMod}
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <button style={buttonMod} onClick={handleSearch}>
                Search
              </button>
            </div>
            {/* Mensaje llamativo */}
            <div className="message">
              <p> Find your perfect ride </p>
              <p className="dreams">Now!</p>
            </div>
          </div>
        </div>
        {/* SEGUNDA ROW  */}
        <div className="row h-100 second-row justify-content-center align-items-center">
          <div className="col-12 second-page col-md-8 position-relative">
            <div className="before-reasons">
              <h1>100% Secure Purchase</h1>
              <h2>Quick and Efficient</h2>
              {/* Contenedor flex para la lista y la imagen */}
              <div className="d-flex master-reasons justify-content-between">
                {/* Lista a la izquierda */}
                <ul className="mt-4">
                  {/* Agregamos margen derecho */}
                  <li>
                    <i class="fa-solid fa-check"></i> Warranty
                  </li>
                  <li>
                    <i class="fa-solid fa-check"></i> Safety
                  </li>
                  <li>
                    <i class="fa-solid fa-check"></i> Personalized Service
                  </li>
                  <li>
                    <i class="fa-solid fa-check"></i> Faster
                  </li>
                  <li>
                    <button className="mt-5 ms-5 btn btn-dark">
                      <Link to="/catalog" style={{ color: "inherit", textDecoration: "none" }}>
                        <h6 style={{ fontWeight: "500", padding: "6px" }}>
                          View all the cars
                        </h6></Link>
                    </button>
                  </li>
                </ul>
                {/* Imagen a la derecha */}
                <img src={backgroundCarTwo} alt="Auto" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
        {/* TECERA ROW */}
        <div className="row h-100 third-row justify-content-center align-items-center ">
          <div className="col-12 third-page col-md-8 position-relative">
            <h1 className="text-center "> What is DrivenS ?</h1>
            <p className="mt-4">
              DrivenS, where buying and selling your car is fast and safe. We accept all makes and models.
            </p>
          </div>
          <div className="col-12 fourth-page col-md-8 position-relative">
            <h1 className="text-center "> How it works?</h1>
            <p className="mt-4">
              Buying a car is super easy. We guide you through the entire process hassle-free.  Check the car's mechanical condition and much more at our DrivenS Safe Points. We'll also assist you with the vehicle transfer process.
            </p>
          </div>
        </div>
        {/* CUARTA ROW  */}
        <div className="row fourth-row ">
          <div className="col-3">
            <i style={{ color: "#2D749B" }} class="fa-solid fa-gear"></i>
            <p className="fs-5">Vehicle inspection</p>
          </div>
          <div className="col-3">
            <i style={{ color: "#113162" }} class="fa-solid fa-shield"></i>
            <p className="fs-5" style={{ marginLeft: "-11px" }}>
              Safe Payment System
            </p>
          </div>
          <div className="col-3">
            <i style={{ color: "#2D749B" }} class="fa-brands fa-paypal"></i>
            <p className="fs-5" style={{ marginLeft: "-50px" }}>
              Easy payment through PayPal
            </p>
          </div>
        </div>
        {/* QUINTA ROW */}
        <div className="row fifth-row justify-content-center align-items-center ">
          <div className="col-12">
            <h1 className="text-center search-by"> Search by category</h1>
          </div>
          {/* Div Category Cars */}
          <div
            className=" category mt-5 col-12 col-md-8 d-flex justify-content-center align-items-center"
            style={{ gap: "100px" }}
          >
            <div className="one" onClick={() => handleCategoryClick("SUV")}>
              <img className="h-2" src={suv} alt="Suv Car" />
              <h4 className="text-center">SUV</h4>
            </div>
            <div className="two" onClick={() => handleCategoryClick("Hatchback")} >
              <img src={hatchback} alt="Hatchback Car" />
              <h4 className="text-center">Hatchback</h4>
            </div>
            <div className="three" onClick={() => handleCategoryClick("Sport")} >
              <img src={sport} alt="Sport Car" />
              <h4 className="text-center">Sport</h4>
            </div>
            <div className="four" onClick={() => handleCategoryClick("Sedan")} >
              <img src={sedan} alt="Sedan Car" />
              <h4 className="text-center">Sedan</h4>
            </div>
          </div>
          {/* Fade Background  for category Cars */}
          <div className="background"></div>
          <div className="col-12 h-25 col-md-8 d-flex justify-content-center align-items-center">
            <h1
              className="text-center "
              style={{ marginTop: "-20vh", color: "#252e7e" }}
            >
              Suggested
            </h1>
          </div>
        </div>

        {/* ---------------------------------------------------------------------------------------- */}

        {/* FILA DE AUTOS RECOMENDADOS CON MAPEO */}

        {store.cars && store.cars.length > 0 ? (
          <>
            <div className="row sixth-row g-0 align-items-center">
              <div className="col-12">
                <div className="popular"><h3>Popular</h3></div>
              </div>
              {store.cars.slice(5, 9).map(car => (
                <div className="col-3" key={car.id}>
                  {renderRecommendedCars([car])} {/* Pasa un array con un solo auto */}
                </div>
              ))}
            </div>
            <div className="row seventh-row justify-content-center align-items-center g-0">
              <div className="col-12">
                <div className="arrival"><h3>New arrivals</h3></div>
              </div>
              {store.cars.slice(9, 13).map(car => (
                <div className="col-3" key={car.id}>
                  {renderRecommendedCars([car])} {/* Pasa un array con un solo auto */}
                </div>
              ))}
            </div>
            <div className="row eight-row mt-5 justify-content-center align-items-center g-0">
              <div className="col-12">
                <div className="selled"><h3>Most selled</h3></div>
              </div>
              {store.cars.slice(13, 17).map(car => (
                <div className="col-3" key={car.id}>
                  {renderRecommendedCars([car])} {/* Pasa un array con un solo coche */}
                </div>
              ))}
            </div>
          </>
        ) : (
          <p style={{ fontSize: "10vh", color: "seagreen" }}>Loading cars...</p>
        )}

        {/* -------------------------------------------------------------------------------------- */}

        {/* ROW DE CONSESIONARIOS */}
        <div className="row nineth-row justify-content-center align-items-center">
          {/* take a look aur Partner DealerShips */}
          <div className="col-12 text-center">
            <h1 style={{ color: "rgb(37, 46, 126)", fontSize: "45px" }}>
              Take a look at our partner Dealerships
            </h1>
          </div>
          {/* LOGOS  */}
          <div
            className="col-12 d-flex justify-content-center"
            style={{ gap: "200px" }}
          >
            <h1 onClick={() => handleDealershipClick("Elite Cars")} style={{ cursor: "pointer" }}>
              <i className="fa-brands fa-digg"></i>
              <p>Elite Cars</p>
            </h1>
            <h1 onClick={() => handleDealershipClick("SpeeDrive")} style={{ cursor: "pointer" }}>
              <i className="fa-brands fa-pied-piper-pp"></i>
              <p>SpeeDrive</p>
            </h1>
            <h1 onClick={() => handleDealershipClick("UniCars")} style={{ cursor: "pointer" }}>
              <i className="fa-brands fa-joomla"></i>
              <p>UniCars</p>
            </h1>
            <h1 onClick={() => handleDealershipClick("Highway16")} style={{ cursor: "pointer" }}>
              <i className="fa-brands fa-pied-piper"></i>
              <p>Highway16</p>
            </h1>
          </div>
          <div
            className="col-12 d-flex justify-content-center"
            style={{ gap: "200px" }}
          >
            <h1 onClick={() => handleDealershipClick("TrueWheels")} style={{ cursor: "pointer" }}>
              <i className="fa-brands fa-square-pied-piper"></i>
              <p>TrueWheels</p>
            </h1>
            <h1 onClick={() => handleDealershipClick("DriveCity")} style={{ cursor: "pointer" }}>
              <i className="fa-solid fa-trademark"></i>
              <p>DriveCity</p>
            </h1>
            <h1 onClick={() => handleDealershipClick("MaxForm")} style={{ cursor: "pointer" }}>
              <i className="fa-solid fa-copyright"></i>
              <p>MaxForm</p>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};
