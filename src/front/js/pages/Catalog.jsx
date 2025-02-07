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

  // Estados Generales para todo tipo de filtros

  const [searchTerm, setSearchTerm] = useState(""); // Para la barra de busqueda
  const [filteredCars, setFilteredCars] = useState([]); // Para la barra de busqueda
  const [noResults, setNoResults] = useState(false); // Para la barra de busqueda
  const [filters, setFilters] = useState({  // Filtro para precios
    minPrice: "",
    maxPrice: "",
  });
  const [brandFilter, setBrandFilter] = useState(""); // Filtro para Brand

  // -----------------------------------------------------------------------------------------------

  // handleInputChange | handleSearchClick Son para la logica de la barra de busqueda principal
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setNoResults(false);
  };
  // Solo a traves del handleClick empeza busqueda del auto
  const handleSearchClick = () => {
    const fieldsToSearch = [ // Campos en los que se buscará
      "model_make_id",
      "model_name",
      "model_color",
      "model_type",
      "model_year",
      "model_price",
    ];
    const filtered = filterCars(store.cars, searchTerm, fieldsToSearch); // Llama a la función genérica
    setFilteredCars(filtered);

    if (filtered.length === 0) {
      setNoResults(true); // Muestra el mensaje si no hay resultados
    } else {
      setNoResults(false); // Oculta el mensaje si hay resultados
    }
  };

  // -----------------------------------------------------------------------------------------------

  // HandleMinPriceChange | handleMaxPriceChange | applyPriceFilter son logica para los filtros por PRECIO

  const handleMinPriceChange = (event) => {
    setFilters({
      ...filters,
      minPrice: event.target.value,
    });
  };

  const handleMaxPriceChange = (event) => {
    setFilters({
      ...filters,
      maxPrice: event.target.value,
    });
  };

  const applyPriceFilter = () => {
    const { minPrice, maxPrice } = filters;

    // Filtra primero por término de búsqueda (si hay un término ingresado)
    const carsFilteredByTerm = filterCars(store.cars, searchTerm, [
      "model_make_id",
      "model_name",
      "model_color",
      "model_type",
      "model_year",
      "model_price",
    ]);

    const filteredByPrice = carsFilteredByTerm.filter((car) => { // Filtra por precio *después* del filtro de búsqueda
      return (
        (minPrice === "" || car.model_price >= parseInt(minPrice)) &&
        (maxPrice === "" || car.model_price <= parseInt(maxPrice))
      );
    });

    setFilteredCars(filteredByPrice); // Actualiza el estado con los coches filtrados

    if (filteredByPrice.length === 0) {
      setNoResults(true); // Muestra mensaje "sin resultados" si no hay coches
    } else {
      setNoResults(false); // Oculta mensaje "sin resultados" si hay coches
    }
  };

  // -----------------------------------------------------------------------------------------------

  // Función genérica para filtrar coches (se usa en ambos filtros)
  const filterCars = (carsToFilter, filterValue, fields) => {
    return carsToFilter.filter((car) => {
      const search = filterValue.toLowerCase();
      for (const field of fields) {
        const carValue = car[field]?.toString().toLowerCase() || "";
        if (carValue.includes(search)) {
          return true;
        }
      }
      return false;
    });
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
                <input
                  className="form-control"
                  type="text"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={handleMinPriceChange}
                  onKeyDown={(ev) => {
                    if (ev.key === "Enter") {
                      applyPriceFilter();
                    }
                  }}
                />
                <h7>Maximum</h7>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={handleMaxPriceChange}
                  onKeyDown={(ev) => {
                    if (ev.key === "Enter") {
                      applyPriceFilter();
                    }
                  }}
                />
                <br />
                <h5>Brand</h5>
                <select className="form-select" id="selectOne">
                  <option>Brand</option>
                  <option value="3">Audi</option>
                  <option value="3">Acura</option>
                  <option value="2">Bentley</option>
                  <option value="3">Buick</option>
                  <option value="3">Chrysler</option>
                  <option value="3">Chevrolet</option>
                  <option value="1">Ford 1</option>
                  <option value="3">Ferrari</option>
                  <option value="3">Volkswagen</option>
                  <option value="3">BMW</option>
                </select>
                <br />
                <h5>Model</h5>
                <select className="form-select" id="selectOne">
                  <option>Model</option>
                  <option value="1">Flying Spur</option>
                  <option value="2">Edge</option>
                  <option value="3">Jetta</option>
                  <option value="3">ATS</option>
                  <option value="3">ATS Couple</option>
                  <option value="3">Continental GT</option>
                  <option value="3">Continental GT</option>
                  <option value="3">RDX</option>
                  <option value="3">Spark</option>
                </select>
                <br />
                <h5>Year</h5>
                <select className="form-select" id="selectOne">
                  <option>Year</option>
                  <option value="1">2008</option>
                  <option value="2">2009</option>
                  <option value="3">2011</option>
                  <option value="3">2012</option>
                  <option value="3">2013</option>
                  <option value="3">2014</option>
                  <option value="3">2015</option>
                  <option value="3">2016</option>
                  <option value="3">2017</option>
                  <option value="3">2018</option>
                  <option value="3">2019</option>
                  <option value="3">2020</option>
                  <option value="3">2021</option>
                  <option value="3">2022</option>
                  <option value="3">2023</option>
                  <option value="3">2024</option>
                </select>
                <br />

                <h5>Localization</h5>
                <select className="form-select" id="selectOne">
                  <option>Localization</option>
                  <option value="1">Elite Cars</option>
                  <option value="2">Speed&Smart</option>
                  <option value="3">Velocity</option>
                  <option value="3">Grand Motors</option>
                  <option value="3">HighWays NY</option>
                </select>
                <br />
                <h5>Car Type</h5>
                <select className="form-select" id="selectOne">
                  <option>Car type</option>
                  <option value="1">SUV</option>
                  <option value="2">Hatchback</option>
                  <option value="3">Sport</option>
                  <option value="3">Sedan</option>
                  <option value="3">Hybrid</option>
                </select>
                <br />
                <button className="btn filter" onClick={applyPriceFilter}>
                  Filter
                </button>
              </div>
            </div>
            <div className="col-9">
              <div>
                <div className="row show-cars g-5">
                  {store.cars.length === 0 ? ( // Si no hay coches en el store
                    <div className="col-12">
                      <p style={{ fontSize: "4vh" }}>
                        No cars available yet. Please add cars to your dealership.
                      </p>
                    </div>
                  ) : filteredCars.length > 0 ? ( // Si hay coches filtrados
                    filteredCars.map((car) => (
                      <div className="col-12 col-md-6 col-lg-4 position-relative" key={car.id}>
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
                          <i className="me-2 fa-solid fa-droplet"></i>
                          {car.model_color}
                        </h5>
                        <h5 className="location-1 pt-2">
                          <i className="fa-solid fa-location-dot"></i> DrivenS{" "}
                          {car.dealership}
                        </h5>
                        <div className="price-v2 d-flex justify-content-around mt-4">
                          <h5>$ {car.model_previous_price}</h5>
                          <div className="price-line"></div>
                          <h5 className="green-price">
                            $ {car.model_price}
                          </h5>
                        </div>
                      </div>
                    ))
                  ) : noResults ? ( // Si no hay resultados (y hay coches en el store)
                    <div className="col-12">
                      <p style={{ fontSize: "4vh" }}>
                        No matches found. Please try adjusting your search filters.
                      </p>
                    </div>
                  ) : ( // Si hay coches en el store y no hay coches filtrados
                    store.cars.map((car) => (
                      <div className="col-12 col-md-6 col-lg-4 position-relative" key={car.id}>
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
                          <i className="me-2 fa-solid fa-droplet"></i>
                          {car.model_color}
                        </h5>
                        <h5 className="location-1 pt-2">
                          <i className="fa-solid fa-location-dot"></i> DrivenS{" "}
                          {car.dealership}
                        </h5>
                        <div className="price-v2 d-flex justify-content-around mt-4">
                          <h5>$ {car.model_previous_price}</h5>
                          <div className="price-line"></div>
                          <h5 className="green-price">
                            $ {car.model_price}
                          </h5>
                        </div>
                      </div>
                    ))
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
