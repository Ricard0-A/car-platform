import React from "react";
import { useContext, useState } from "react";
import { Context } from "../store/appContext";
// Styles Css
import "../../styles/catalog.css";

// Test Cars
import ford1 from "../../img/suggested/ford-1.jpg";
import acura1 from "../../img/suggested/acura-1.png"; // id: 82563
import bentley2 from "../../img/suggested/bentley-2.jpg"; // id: 82563
import { array } from "prop-types";


const Catalog = () => {
  const { store } = useContext(Context);

  const inputMod = {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: "20px 0 0 20px",
    padding: "10px 20px",
    position: "relative",
  };

  const buttonMod = {
    fontWeight: "400",
    backgroundColor: "rgb(27, 177, 104)",
    border: "none",
    padding: "10px 20px",
    borderRadius: "0 20px 20px 0",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    position: "relative",
  };


  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);
  const [noResults, setNoResults] = useState(false);


  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setNoResults(false); // Oculta el mensaje al escribir en el input
  };

  const handleSearchClick = () => {
    const cars = store.cars.filter((car) => {
      const search = searchTerm.toLowerCase();
      const marca = car.model_make_id?.toLowerCase() || "";
      const modelo = car.model_name?.toLowerCase() || "";
      const color = car.model_color?.toLowerCase() || "";
      const tipo = car.model_type?.toLowerCase() || "";
      const anio = car.model_year?.toString().toLowerCase() || "";
      const precio = car.model_price?.toString().toLowerCase() || "";

      return (
        marca.includes(search) ||
        modelo.includes(search) ||
        color.includes(search) ||
        tipo.includes(search) ||
        anio.includes(search) ||
        precio.includes(search)
      );
    });
    setFilteredCars(cars);

    if (cars.length === 0) {
      setNoResults(true); // Muestra el mensaje si no hay resultados
    } else {
      setNoResults(false); // Oculta el mensaje si hay resultados
    }
  };

  return (
    <>
      <div className="container-fluid" style={{ marginTop: "100px" }}>
        <div className="row">
          <div className="col-12 d-flex justify-content-center align-items-center">
            <div style={{ display: "flex", width: "70%" }}>
              <input
                type="text"
                className="form-control"
                placeholder="What car are you looking for?"
                style={inputMod}
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSearchClick();
                  }
                }}
              />
              <button style={buttonMod} onClick={handleSearchClick}>
                Search
              </button>
            </div>
          </div>
          <div className="row catalog-row">
            <div className="col-3">
              <div className="div-filter border shadow">
                <h5 className="mt-2 pb-2">Price</h5>
                <h7>Minimum</h7>
                <input className="form-control" type="text" />
                <h7>Maximum</h7>
                <input className="form-control" type="text" />
                <br />
                <h5>Brand</h5>
                <select className="form-select" id="selectOne">
                  <option>Brand</option>
                  <option value="1">Opción 1</option>
                  <option value="2">Opción 2</option>
                  <option value="3">Opción 3</option>
                </select>
                <br />
                <h5>Model</h5>
                <select className="form-select" id="selectOne">
                  <option>Model</option>
                  <option value="1">Opción 1</option>
                  <option value="2">Opción 2</option>
                  <option value="3">Opción 3</option>
                </select>
                <br />
                <h5>Year</h5>
                <select className="form-select" id="selectOne">
                  <option>Year</option>
                  <option value="1">Opción 1</option>
                  <option value="2">Opción 2</option>
                  <option value="3">Opción 3</option>
                </select>
                <br />

                <h5>Localization</h5>
                <select className="form-select" id="selectOne">
                  <option>Localization</option>
                  <option value="1">Opción 1</option>
                  <option value="2">Opción 2</option>
                  <option value="3">Opción 3</option>
                </select>
                <br />
                <h5>Car Type</h5>
                <select className="form-select" id="selectOne">
                  <option>Car type</option>
                  <option value="1">Opción 1</option>
                  <option value="2">Opción 2</option>
                  <option value="3">Opción 3</option>
                </select>
                <br />
                <button className="btn filter"> Filter </button>
              </div>
            </div>
            <div className="col-9">
              <div>
                <div className="row show-cars g-5">
                  {noResults && (
                    <div className="col-12">
                      <p style={{ fontSize: "4vh" }}>No matches found. Please try adjusting your search filters.</p>
                    </div>
                  )}
                  {!noResults && (
                    <>
                      {filteredCars.length > 0 ? (
                        filteredCars.map((car) => (
                          <div
                            className="col-12 col-md-6 col-lg-4 position-relative"
                            key={car.id}
                          >
                            <div className="fav">
                              <i className="fa-regular fa-heart"></i>
                            </div>
                            <img src={car.model_picture || acura1} alt="Car" />
                            <h6>{car.model_type}</h6>
                            <h2>{car.model_make_id}</h2>
                            <h5>{car.model_name}</h5>
                            <br />
                            <h5 className="year-km-1">
                              {car.model_year || "2022"}
                              <span className="mx-2">&#8226;</span>
                              <i class="me-2 fa-solid fa-droplet"></i>
                              {car.model_color}
                            </h5>
                            <h5 className="location-1 pt-2">
                              <i className="fa-solid fa-location-dot"></i>{" "}
                              DrivenS{" "}{car.dealership}
                            </h5>
                            <div className="price-v2 d-flex justify-content-around mt-4">
                              <h5>$ {car.model_previous_price},000</h5>
                              <div className="price-line"></div>
                              <h5 className="green-price">
                                $ {car.model_price},000
                              </h5>
                            </div>
                          </div>
                        ))
                      ) : (
                        store.cars.map((car) => (
                          <div
                            className="col-12 col-md-6 col-lg-4 position-relative"
                            key={car.id}
                          >
                            <div className="fav">
                              <i className="fa-regular fa-heart"></i>
                            </div>
                            <img src={car.model_picture || acura1} alt="Car" />
                            <h6>{car.model_type}</h6>
                            <h2>{car.model_make_id}</h2>
                            <h5>{car.model_name}</h5>
                            <br />
                            <h5 className="year-km-1">
                              {car.model_year || "2022"}
                              <span className="mx-2">&#8226;</span>
                              <i class="me-2 fa-solid fa-droplet"></i>
                              {car.model_color}
                            </h5>
                            <h5 className="location-1 pt-2">
                              <i className="fa-solid fa-location-dot"></i>{" "}
                              DrivenS {" "}
                              {car.dealership}
                            </h5>
                            <div className="price-v2 d-flex justify-content-around mt-4">
                              <h5>$ {car.model_previous_price},000</h5>
                              <div className="price-line"></div>
                              <h5 className="green-price">
                                $ {car.model_price},000
                              </h5>
                            </div>
                          </div>
                        ))
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Catalog;
