// Importaciones importantes
import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

import backgroundCar from "../../img/WF.jpg";
import backgroundCarTwo from "../../img/backgroundCarTwo.jpg";

// Category Cars
import suv from "../../img/category/suv.png";
import hatchback from "../../img/category/hatchback.png";
import sport from "../../img/category/sport.png";
import sedan from "../../img/category/sedan.png";

// Suggested images
import ford1 from "../../img/suggested/ford-1.jpg"; // id: 82769
import acura1 from "../../img/suggested/acura-1.png"; // id: 82563
import audi1 from "../../img/suggested/audi-1.jpg"; // id: 81679
import bentley1 from "../../img/suggested/bentley-1.jpg"; // id: 82207
import cadillac1 from "../../img/suggested/cadillac-1.jpg"; // id: 81756
import buick1 from "../../img/suggested/buick-1.jpg"; // id: 84039
import ford2 from "../../img/suggested/ford-2.jpg"; // id: 84053
import lyser1 from "../../img/suggested/lyser-1.jpg"; // id: 84053
import chevrolet1 from "../../img/suggested/chevrolet-1.jpg"; // id: 81090
import bentley2 from "../../img/suggested/bentley-2.jpg"; // id: 4029
import acura2 from "../../img/suggested/acura-2.jpg"; // id: 69160
import cadillac2 from "../../img/suggested/cadillac-2.jpg"; // id: 73295

// Extra 
import safeShield from "../../img/safe-shield.png"

// Styles
import "../../styles/home.css";

export const Home = () => {
  // Lógica extra antes del return
  const navigate = useNavigate();
  const { store } = useContext(Context);

  const handleSearch = () => {
    if (searchTerm) { // Solo navega si searchTerm no está vacío
      const params = new URLSearchParams();
      params.append('search', searchTerm);
      navigate(`/catalog?${params.toString()}`);
    } else {
      // Manejar el caso en que searchTerm está vacío, por ejemplo, mostrar un mensaje al usuario
      alert("Please enter a search term."); // Puedes usar un alert, un modal o un mensaje en la UI
    }
  };


  // Objeto CSS ya que img-url tradicional no funciona
  const firstImg = {
    background: `url(${backgroundCar}) center/cover`,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Oscurece la imagen
    backgroundBlendMode: "overlay", // Fusiona la imagen con el sombreado
  };
  const inputMod = {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: "20px 0 0 20px", // Redondea solo borde izquierdo
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
        <div className="position-relative" key={car.id}>
          <div className="favorites">
            <i className="fs-4 fa-regular fa-heart"></i>
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
      ))}
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
                      <h6 style={{ fontWeight: "500", padding: "6px" }}>
                        View all the cars
                      </h6>
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
              DrivenS, Find your dream car quickly and securely. We accept all
              makes and models, e accept all makes and models u accept all makes
              and m.
            </p>
          </div>
          <div className="col-12 fourth-page col-md-8 position-relative">
            <h1 className="text-center "> How it works?</h1>
            <p className="mt-4">
              Buying a car is super easy, we gu`i`de you through the entire
              process with no hassle. Check the car’s mechanical conditions and
              much more at our Safe Points of DrivenS. We’ll also assist you
              through the Vehicle Transfer process.
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
            <div className="one">
              <img className="h-2" src={suv} alt="Suv Car" />
              <h4 className="text-center">SUV</h4>
            </div>
            <div className="two">
              <img src={hatchback} alt="Hatchback Car" />
              <h4 className="text-center">Hatchback</h4>
            </div>
            <div className="three">
              <img src={sport} alt="Sport Car" />
              <h4 className="text-center">Sport</h4>
            </div>
            <div className="four">
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
              {store.cars.slice(0, 4).map(car => (
                <div className="col-3" key={car.id}>
                  {renderRecommendedCars([car])} {/* Pasa un array con un solo auto */}
                </div>
              ))}
            </div>
            <div className="row seventh-row justify-content-center align-items-center g-0">
              <div className="col-12">
                <div className="arrival"><h3>New arrivals</h3></div>
              </div>
              {store.cars.slice(4, 8).map(car => (
                <div className="col-3" key={car.id}>
                  {renderRecommendedCars([car])} {/* Pasa un array con un solo auto */}
                </div>
              ))}
            </div>
            <div className="row eight-row mt-5 justify-content-center align-items-center g-0">
              <div className="col-12">
                <div className="selled"><h3>Most selled</h3></div>
              </div>
              {store.cars.slice(8, 12).map(car => (
                <div className="col-3" key={car.id}>
                  {renderRecommendedCars([car])} {/* Pasa un array con un solo coche */}
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>Loading cars...</p>
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
            <h1>
              {" "}
              <i class="fa-brands fa-digg"></i>{" "}
            </h1>
            <h1>
              {" "}
              <i class="fa-brands fa-pied-piper-pp"></i>
            </h1>
            <h1>
              {" "}
              <i class="fa-brands fa-joomla"></i>
            </h1>
            <h1>
              {" "}
              <i class="fa-brands fa-pied-piper"></i>
            </h1>
          </div>
          <div
            className="col-12 d-flex justify-content-center"
            style={{ gap: "200px" }}
          >
            <h1>
              {" "}
              <i class="fa-brands fa-square-pied-piper"></i>{" "}
            </h1>
            <h1>
              {" "}
              <i class="fa-solid fa-trademark"></i>{" "}
            </h1>
            <h1>
              {" "}
              <i class="fa-solid fa-copyright"></i>
            </h1>
          </div>
        </div>
        {/* FIN DE LA PAGINA  */}
      </div>
    </>
  );
};
