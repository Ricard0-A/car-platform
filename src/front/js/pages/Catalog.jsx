import React from "react";
import { useContext, useState, useEffect, useLayoutEffect } from "react";
import { Context } from "../store/appContext";
import { useLocation } from "react-router-dom";
// Styles Css
import "../../styles/catalog.css";

// Test Cars
import ford1 from "../../img/suggested/ford-1.jpg";
import acura1 from "../../img/suggested/acura-1.png"; // id: 82563
import bentley2 from "../../img/suggested/bentley-2.jpg"; // id: 82563
// import { array } from "prop-types";


const Catalog = () => {
  const { store, actions } = useContext(Context);
  const location = useLocation();

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

  // Testeando soluciones
  // const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Carga inicial de coches o aplica filtros si hay término de búsqueda en la URL
    const params = new URLSearchParams(location.search);
    const urlSearchTerm = params.get("search") || "";

    if (store.cars && store.cars.length > 0) {
      applyFilters(urlSearchTerm);
    } else if (store.cars && store.cars.length === 0) {
      console.log("No existen autos para rendizar en la store")
    }
  }, [store.cars, location.search]); //Primera vez store.cars:vacio, segunda vez con la dependencia store.cars:full

  const handleFavoriteClick = (car) => {
    if (car && car.id) {
      actions.addFavorite(car.id);
    } else {
      console.error("Car or car.id is undefined", car);
    }
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
  const [modelFilter, setModelFilter] = useState(""); // Filtro para Model
  const [yearFilter, setYearFilter] = useState(""); // Filtro para Year 
  const [locationFilter, setLocationFilter] = useState(""); //Filtro para Localization (Dealerships)
  const [carTypeFilter, setCarTypeFilter] = useState(""); //Filtro para Model Type 

  // -----------------------------------------------------------------------------------------------

  // Logica para Evitar colapso de filtros 
  const applySearchTermFilter = (term) => {
    const fieldsToSearch = [
      "model_make_id", "model_name", "model_color",
      "model_type", "model_year", "model_price"
    ];
    const carsFilteredByTerm = filterCars(store.cars, term, fieldsToSearch);
    return carsFilteredByTerm;
  };


  const applyOtherFilters = (carsToFilter) => {
    const { minPrice, maxPrice } = filters;
    const filteredByPrice = carsToFilter.filter(car =>
      (minPrice === "" || car.model_price >= parseInt(minPrice)) &&
      (maxPrice === "" || car.model_price <= parseInt(maxPrice))
    );

    const carsFilteredByBrand = brandFilter === "" ? filteredByPrice : filterCars(filteredByPrice, brandFilter, ["model_make_id"]);
    const carsFilteredByModel = modelFilter === "" ? carsFilteredByBrand : filterCars(carsFilteredByBrand, modelFilter, ["model_name"]);
    const carsFilteredByYear = yearFilter === "" ? carsFilteredByModel : filterCars(carsFilteredByModel, yearFilter, ["model_year"]);
    const carsFilteredByLocation = locationFilter === "" ? carsFilteredByYear : filterCars(carsFilteredByYear, locationFilter, ["dealership"]);
    const carsFilteredByCarType = carTypeFilter === "" ? carsFilteredByLocation : filterCars(carsFilteredByLocation, carTypeFilter, ["model_type"]);

    return carsFilteredByCarType; // Retornar el array filtrado
  };



  // Logica por si alguien decide buscar un auto desde la pagina home.jsx 

  useLayoutEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlSearchTerm = params.get("search") || "";
    setSearchTerm(urlSearchTerm);
    if (urlSearchTerm) {
      applyFilters(urlSearchTerm);
    }
  }, [location.search]);


  // handleInputChange | handleSearchClick Son para la logica de la barra de busqueda principal
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setNoResults(false);
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

  const applyFilters = (term = searchTerm) => {
    // Si se ha ingresado algún filtro adicional, se ignora el search term y se toma la lista completa
    if (
      brandFilter ||
      modelFilter ||
      yearFilter ||
      locationFilter ||
      carTypeFilter ||
      filters.minPrice ||
      filters.maxPrice
    ) {
      const carsFiltered = applyOtherFilters(store.cars);
      setFilteredCars(carsFiltered);
      setNoResults(carsFiltered.length === 0);
    } else {
      // Si no hay filtros adicionales, se filtra según el término de búsqueda
      const carsFilteredByTerm = applySearchTermFilter(term);
      const carsFiltered = applyOtherFilters(carsFilteredByTerm);
      setFilteredCars(carsFiltered);
      setNoResults(carsFiltered.length === 0);
    }
  };

  // -----------------------------------------------------------------------------------------------

  // Función genérica para filtrar autos (se usa en ambos filtros)
  const filterCars = (carsToFilter, filterValue, fields) => {
    return carsToFilter.filter((car) => {
      if (filterValue === undefined || filterValue === null || typeof filterValue !== 'string') {
        return false; // O puedes retornar true si quieres incluir los autos cuando el filtro es inválido
      }

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
                    applyFilters(); // Antes era handleSearchClick();
                  }
                }}
              />
              <button style={buttonMod} onClick={applyFilters}>
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
                      applyFilters(); // Era applyPriceFilter()
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
                      applyFilters(); // Era applyPriceFilter()
                    }
                  }}
                />
                <br />
                <h5>Brand</h5>
                <select className="form-select" value={brandFilter} onChange={(e) => { setBrandFilter(e.target.value); }}>
                  <option value="">All Brands</option>
                  {Array.from(new Set(store.cars.map(car => car.model_make_id))).sort().map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
                <br />
                <h5>Model</h5>
                <select className="form-select" value={modelFilter} onChange={(e) => { setModelFilter(e.target.value); }}>
                  <option value="">{brandFilter === "" ? "Select a brand" : "All Models"}</option>
                  {brandFilter !== "" && Array.from(new Set(store.cars.filter(car => car.model_make_id === brandFilter).map(car => car.model_name))).sort().map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
                <br />
                <h5>Year</h5>
                <select className="form-select" value={yearFilter} onChange={(e) => { setYearFilter(e.target.value); }}>
                  <option value="">All Years</option>
                  {Array.from(new Set(store.cars.map(car => car.model_year))).sort().reverse().map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <br />

                <h5>Localization</h5>
                <select className="form-select" value={locationFilter} onChange={(e) => { setLocationFilter(e.target.value); }}>
                  <option value="">All Locations</option>
                  {Array.from(new Set(store.cars.map(car => car.dealership))).sort().map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
                <br />
                <h5>Car Type</h5>
                <select className="form-select" value={carTypeFilter} onChange={(e) => { setCarTypeFilter(e.target.value); }}>
                  <option value="">All Car Types</option>
                  {Array.from(new Set(store.cars.map(car => car.model_type))).sort().map(carType => (
                    <option key={carType} value={carType}>{carType}</option>
                  ))}
                </select>
                <br />
                <button className="btn filter" onClick={applyFilters}>
                  Filter
                </button>
              </div>
            </div>
            <div className="col-9">
              <div>
                <div className="row show-cars g-5">
                  {store.cars.length === 0 ? ( // Si no hay autos en el store
                    <div className="col-12">
                      <p style={{ fontSize: "4vh" }}>
                        No cars available yet. Please add cars to your dealership.
                      </p>
                    </div>
                  ) : filteredCars.length > 0 ? ( // Si hay autos filtrados
                    filteredCars.map((car) => (
                      <div className="col-12 col-md-6 col-lg-4 position-relative" key={car.id}>
                        <div className="fav">
                          <i
                            className={`fs-4 fa-regular fa-heart ${store.favorites.some(fav => fav.car_id === car.id) ? 'fa-solid filled' : ''}`}
                            onClick={() => handleFavoriteClick(car)}
                          />
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
                  ) : noResults ? ( // Si no hay resultados (y hay autos en el store)
                    <div className="col-12">
                      <p style={{ fontSize: "4vh" }}>
                        No matches found. Please try adjusting your search filters.
                      </p>
                    </div>
                  ) : ( // Si hay autos en el store y no hay autos filtrados
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
