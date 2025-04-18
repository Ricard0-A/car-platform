
import React from "react";
import { useContext, useState, useEffect, useLayoutEffect } from "react";
import { Context } from "../store/appContext";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../styles/catalog.css";

import ford1 from "../../img/suggested/ford-1.jpg";
import acura1 from "../../img/suggested/acura-1.png";
import bentley2 from "../../img/suggested/bentley-2.jpg";
// import { array } from "prop-types";



const Catalog = () => {

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


  // Target a la store y actions de flux.js
  const { store, actions } = useContext(Context);

  // Estados para manipular los autos favoritos y tambien almacenar los autos
  const [favoriteCars, setFavoriteCars] = useState([]);
  const [allCars, setAllCars] = useState([]);



  // ======================================================================================================

  // Este useEffect solo es util cuando viene desde Home.jsx
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlSearchTerm = params.get("search") || "";
    if (store.cars && store.cars.length > 0) {
      console.log("Valor de urlSearchTerm: ", urlSearchTerm, typeof (urlSearchTerm));
      applyFilters(urlSearchTerm); // Pero si no se produjo busqueda mediante queryParams 
      // entonces esto no se aplica por que urlSearchTerm es null || ""
    } else if (store.cars && store.cars.length === 0) {
      console.log("lista actual de autos: ", store.cars)
    }
  }, [store.cars, location.search]); //Primera vez store.cars:vacio, segunda vez con la dependencia store.cars:full
  // (Recordar la UI se monta primero, luego los efectos y por eso las dependencias!)


  // ------------------------------------------------------------------------


  // Carga autos con filtro Type Car desde Home.jsx
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const carTypeParam = params.get("carType"); // ej: cartype=SUV
    if (carTypeParam) {
      setCarTypeFilter(carTypeParam);
      applyFilters();
    }
  }, [location.search]);


  // Filtro de Localization(Dealership) desde home.jsx
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const locationParam = params.get("location");
    if (locationParam) {
      setLocationFilter(locationParam);
      applyFilters();
    }
  }, [location.search]);


  // ===================================================================================




  // LoadAllCars + setState
  useEffect(() => {
    const loadCarsAndFavorites = async () => {
      try {
        await actions.loadAllCars();
        const carsFromStore = store.cars; // loadCars + setState
        setAllCars(carsFromStore); // <--

        if (store.currentUser) { //Verify this
          const favorites = await actions.loadFavorites();

          if (favorites) {
            setFavoriteCars(favorites);
          }
        } else {
          setFavoriteCars([]); // Limpia los favoritos si el usuario no está logueado
        }
      } catch (error) {
        console.error("Error loading cars or favorites:", error);
      }
    };

    loadCarsAndFavorites();
  }, [store.currentUser]);



  // Agregar a favoritos y eliminarlos
  const handleFavoriteClick = async (car) => {
    try {
      const isFavorite = favoriteCars.some(fav => fav.car_id === car.id);
      const success = await actions.addFavorite(car.id);
      if (success) {
        const updatedFavorites = await actions.loadFavorites();
        if (updatedFavorites) {
          setFavoriteCars(updatedFavorites); // setState puede sobreescribir
        }
      }

    } catch (error) {
      console.error("Error for adding or deleting favorites:", error);
    }
  };



  // ==========================================================================================


  // Estados Generales para todo tipo de filtros


  //  ↓ Flujo de Estados ↓ 

  // Usuario escribe "Ford" ➜ setSearchTerm ➜ ApplyFilters ➜ setFilteredCars ➜ UI
  // No results solo para controlar si se ha filtrado o no 

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);
  const [noResults, setNoResults] = useState(false);



  // Filtros por <select> + </options>
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
  });
  const [brandFilter, setBrandFilter] = useState("");
  const [modelFilter, setModelFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [carTypeFilter, setCarTypeFilter] = useState("");

  // -----------------------------------------------------------------------------------------------

  // Funcion auxiliar anticolapso de filtros
  const applySearchTermFilter = (term) => {
    const fieldsToSearch = [
      "model_make_id", "model_name", "model_color",
      "model_type", "model_year", "model_price"
    ];
    const carsFilteredByTerm = filterCars(store.cars, term, fieldsToSearch);
    //EJ; filterCars(store.cars, "ford", "make_model_id")

    return carsFilteredByTerm;
  };

  // Filtro secundaria de busqueda
  const applyOtherFilters = (carsToFilter) => {
    const { minPrice, maxPrice } = filters;

    const filteredByPrice = carsToFilter.filter(car =>
      (minPrice === "" || car.model_price >= parseInt(minPrice)) &&
      (maxPrice === "" || car.model_price <= parseInt(maxPrice))
    );
    // como ultima opcion true && true , entonces filter en cada iteracion 
    // deja pasar al elemento actual


    // Reasignacion multiple en cascada comenzando con filteredByPrice 
    const carsFilteredByBrand = brandFilter === "" ? filteredByPrice : filterCars(filteredByPrice, brandFilter, ["model_make_id"]);
    const carsFilteredByModel = modelFilter === "" ? carsFilteredByBrand : filterCars(carsFilteredByBrand, modelFilter, ["model_name"]);
    const carsFilteredByYear = yearFilter === "" ? carsFilteredByModel : filterCars(carsFilteredByModel, yearFilter, ["model_year"]);
    const carsFilteredByLocation = locationFilter === "" ? carsFilteredByYear : filterCars(carsFilteredByYear, locationFilter, ["dealership"]);
    const carsFilteredByCarType = carTypeFilter === "" ? carsFilteredByLocation : filterCars(carsFilteredByLocation, carTypeFilter, ["model_type"]);
    // No se sobreescribe nada , filterCars se basa en su primer parametro a una constante anterior 


    return carsFilteredByCarType;
  };


  useLayoutEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlSearchTerm = params.get("search") || "";
    if (urlSearchTerm) {
      setSearchTerm(urlSearchTerm);
      applyFilters(urlSearchTerm);
    } else {
      console.log("urlSearchTerm es ' ' (string) por que no hubo busqueda desde home: ", typeof (urlSearchTerm));
    }
  }, [location.search]);

  // HandleMinPriceChange | handleMaxPriceChange | applyPriceFilter son logica para los filtros por PRECIO

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setNoResults(false);
  };

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
  // debugger;

  // Funcion primaria de busqueda  
  const applyFilters = (term = searchTerm) => {
    // Solo para Filtros por seleccion
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
      console.log("Pasamos por el if/filtros por seleccion");
      // Si no hay filtros por seleccion en cascada... else 
    } else {
      // Si no hay filtros adicionales, se filtra según la barra de busqueda (escrita)
      const carsFilteredByTerm = applySearchTermFilter(term); // term = searchTerm (escrito)
      const carsFiltered = applyOtherFilters(carsFilteredByTerm);
      setFilteredCars(carsFiltered);
      setNoResults(carsFiltered.length === 0);
      console.log("Pasamos al else/filtros por busqueda");
    }
  };
  // -----------------------------------------------------------------------------------------------

  //  Funcion que coopera con la de los filtros
  const filterCars = (carsToFilter, filterValue, fields) => {
    return carsToFilter.filter((car) => {
      if (filterValue === undefined || filterValue === null || typeof filterValue !== 'string') {
        return false;
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


  // WELCOME TO UI 
  return (
    <>
      <div className="container-fluid" style={{ marginTop: "100px", paddingBottom: "81px", paddingTop: "40px" }}>
        <div className="row">
          <div className="col-12 d-flex justify-content-center align-items-center">
            <div style={{ display: "flex", width: "70%" }}>
              <input
                type="text"
                className="form-control"
                placeholder="What car are you looking for?"
                style={inputMod}
                value={searchTerm} // Y aqui almaceno lo del estado que fue cambiado gracias a handleThings
                onChange={handleInputChange} // Almaceno mediante una funcion el target.value en un estado para usarlo en el Value = 
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    applyFilters();
                  }
                }}
              />
              <button style={buttonMod} onClick={() => applyFilters()}>
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
                      applyFilters();
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
                      applyFilters();
                    }
                  }}
                />
                <br />
                <h5>Brand</h5>
                <select className="form-select" value={brandFilter} onChange={(e) => { setBrandFilter(e.target.value); }}>
                  {store.cars.length > 0 ? (
                    <>
                      <option value="">All Brands</option>
                      {Array.from(new Set(store.cars.map(car => car.model_make_id))).sort().map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </>
                  ) :
                    <option>Loading Cars...</option>
                  }
                </select>
                <br />
                <h5>Model</h5>
                <select className="form-select" value={modelFilter} onChange={(e) => { setModelFilter(e.target.value); }}>
                  {store.cars.length > 0 ? (
                    <>
                      <option value="">{brandFilter === "" ? "Select a brand" : "All Models"}</option>
                      {brandFilter !== "" && Array.from(new Set(store.cars.filter(car => car.model_make_id === brandFilter).map(car => car.model_name))).sort().map(model => (
                        <option key={model} value={model}>{model}</option>
                      ))}
                    </>
                  ) : (
                    <option> Loading Cars...</option>
                  )}
                </select>
                <br />
                <h5>Year</h5>
                <select className="form-select" value={yearFilter} onChange={(e) => { setYearFilter(e.target.value); }}>
                  {store.cars.length > 0 ? (
                    <>
                      <option value="">All Years</option>
                      {Array.from(new Set(store.cars.map(car => car.model_year))).sort().reverse().map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </>
                  ) : (
                    <option>Loading Cars...</option>
                  )}
                </select>
                <br />
                <h5>Localization</h5>
                <select className="form-select" value={locationFilter} onChange={(e) => { setLocationFilter(e.target.value); }}>
                  {store.cars.length > 0 ? (
                    <>
                      <option value="">All Locations</option>
                      {Array.from(new Set(store.cars.map(car => car.dealership))).sort().map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </>
                  ) : (
                    <option>Loading Cars...</option>
                  )}
                </select>
                <br />
                <h5>Car Type</h5>
                <select className="form-select" value={carTypeFilter} onChange={(e) => { setCarTypeFilter(e.target.value); }}>
                  {store.cars.length > 0 ? (
                    <>
                      <option value="">All Car Types</option>
                      {Array.from(new Set(store.cars.map(car => car.model_type))).sort().map(carType => (
                        <option key={carType} value={carType}>{carType}</option>
                      ))}
                    </>
                  ) : (
                    <option>Loading Cars...</option>
                  )}
                </select>
                <br />
                <button className="btn filter" onClick={() => applyFilters()}>
                  Filter
                </button>
              </div>
            </div>
            <div className="col-9">
              <div>
                <div className="row show-cars g-5">
                  {store.cars && store.cars.length > 0 ? (
                    filteredCars.length > 0 ? (
                      filteredCars.map((car) => {
                        const isFavorite = favoriteCars.some(fav => fav.car_id === car.id);
                        return (
                          <div className="col-12 col-md-6 col-lg-4 position-relative" key={car.id}>
                            <Link to={`/car-detail/${car.id}`} style={{ textDecoration: 'none', color: 'inherit' }} >
                              <div className="fav">
                                <i
                                  className={`fs-4 fa-regular fa-heart ${isFavorite ? 'fa-solid filled' : ''}`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleFavoriteClick(car);
                                  }}
                                />
                              </div>
                              <img src={car.model_picture || acura1} alt="Car" />
                              <h6>{car.model_type}</h6>
                              <h2>{car.model_make_id}</h2>
                              <h5 className="text-truncate">{car.model_name}</h5>
                              <br />
                              <h5 className="year-km-1 text-truncate">
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
                            </Link> </div>
                        );
                      })
                    ) : (
                      !noResults ? (
                        store.cars.map((car) => {
                          const isFavorite = favoriteCars.some(fav => fav.car_id === car.id);
                          return (
                            <div className="col-12 col-md-6 col-lg-4 position-relative" key={car.id}>
                              <div className="fav">
                                <i
                                  className={`fs-4 fa-regular fa-heart ${isFavorite ? 'fa-solid filled' : ''}`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleFavoriteClick(car);
                                  }}
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
                          );
                        })
                      ) : (
                        <div className="col-12">
                          <p style={{ fontSize: "4vh" }}>No results found.</p>
                        </div>
                      )
                    )
                  ) : (
                    <div className="col-12">
                      <p style={{ fontSize: "4vh" }}>Loading cars...</p>
                    </div>
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
