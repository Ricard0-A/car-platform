import mainCar from "../../img/suggested/bentley-1.jpg";
import "../../styles/car-detail.css";
import carTest from "../../img/detailCarTest.jpg";
import cadillac1 from "../../img/suggested/cadillac-1.jpg";
import chevrolet1 from "../../img/suggested/chevrolet-1.jpg";
import ford1 from "../../img/suggested/ford-1.jpg";
import innerCar from "../../img/inner-photos.jpg";
import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const CarDetail = () => {
    const { store, actions } = useContext(Context);
    const { idCar } = useParams();

    const [carDetail, setCarDetail] = useState({});
    // Esta funcion se encarga de encontrar el id de cars pero que sea == a idCar de este componente con (useParams())
    // Asi este carDetail sera dinamico y posteriormente se usa en el jsx.
    const findCar = () => {
        const result = store.cars.find((item) => item.id == idCar);
        setCarDetail(result || {});
    };

    useEffect(() => {
        findCar();
    }, [store.cars]);

    const handleFavoriteClick = async (car) => {
        try {
            const isFavorite = store.favorites && store.favorites.some((fav) => fav.car_id === car.id);
            const success = await actions.addFavorite(car.id);
            if (success) {
                await actions.loadFavorites();
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };

    const innerPhoto = {
        background: `url(${innerCar}) center/contain`,
    };

    return (
        <div className="container-fluid" style={{ marginTop: "88px", height: "100vh" }}>
            <div className="row d-flex justify-content-center" style={{ height: "86%" }}>
                <div className="col-6">
                    <div className="left-side">
                        <img src={carDetail?.model_picture} alt="Main Car Image" />
                        <div className="photos">
                            <div className="inner-photos" style={innerPhoto}>
                                <div className="photos-number">
                                    <p>10</p>
                                </div>
                                <p>Photos</p>
                            </div>
                        </div>
                        {/* Lógica de favoritos para CarDetail */}
                        <div className="big-favorites" style={{ cursor: "pointer" }}>
                            <i
                                className={`fa-heart ${store.favorites && store.favorites.some((fav) => fav.car_id === carDetail.id)
                                    ? "fa-solid filled"
                                    : "fa-regular"
                                    }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleFavoriteClick(carDetail);
                                }}
                            ></i>
                            <p>Save</p>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="right-side">
                        <div className="d-flex justify-content-between" style={{ width: "36rem" }}>
                            <button className="type-car">{carDetail?.model_type}</button>
                            <div className="socials">
                                <i className="fa-brands fa-facebook"></i>
                                <i className="fa-brands fa-youtube"></i>
                                <i className="fa-brands fa-twitter"></i>
                            </div>
                        </div>
                        <h1 style={{ color: "seagreen" }}>{carDetail?.model_make_id}</h1>
                        <h2 className="model-name">{carDetail?.model_name}</h2>
                        <div className="first-horizon-line"></div>
                        <div className="features-line">
                            <p>{carDetail?.model_year}</p>
                            <div className="mini-line"></div>
                            <p>{carDetail?.model_color}</p>
                            <div className="mini-line"></div>
                            <p>Automatic</p>
                            <div className="mini-line"></div>
                            <p>{carDetail?.model_engine_fuel}</p>
                        </div>
                        <div className="second-horizon-line"></div>
                        <div className="div-features">
                            <h4>Price including {carDetail?.dealership} bonus</h4>
                            <h1>${" "} {carDetail?.model_price}</h1>
                            <Link to="/reserve" style={{ color: "inherit", textDecoration: "none" }}>
                                <button className="btn btn-success">Reserve Now</button></Link>
                        </div>
                    </div>
                </div>
                {/* Div-Box de todas las características del auto */}
                <div className="box-features">
                    <div className="container" style={{ paddingBottom: "26px" }}>
                        <div className="card-features">
                            <div className="card-title d-flex align-items-center">
                                <i className="fa-solid fa-gear"></i>
                                <p>Features</p>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <h4>Year:</h4>
                                    <p>{carDetail?.model_year}</p>
                                </div>
                                <div className="col-4">
                                    <h4>Model:</h4>
                                    <p>{carDetail?.model_name}</p>
                                </div>
                                <div className="col-4">
                                    <h4>Transmission:</h4>
                                    <p>Automatic</p>
                                </div>
                            </div>
                            <div className="row line-2">
                                <div className="col-4">
                                    <h4>Color:</h4>
                                    <p>{carDetail?.model_color}</p>
                                </div>
                                <div className="col-4">
                                    <h4>Fuel:</h4>
                                    <p>{carDetail?.model_engine_fuel}</p>
                                </div>
                                <div className="col-4">
                                    <h4>Type:</h4>
                                    <p>{carDetail?.model_type}</p>
                                </div>
                            </div>
                            {/* Equipo */}
                            <div className="card-title d-flex align-items-center">
                                <i className="fa-solid fa-magnifying-glass"></i>
                                <p>Equipment</p>
                            </div>
                            <div className="row row-description">
                                <div className="col-4">
                                    <i className="fa-solid fa-check"></i>
                                    <p>Air conditioning</p>
                                </div>
                                <div className="col-4">
                                    <i className="fa-solid fa-check"></i>
                                    <p>Adjustable Wheel</p>
                                </div>
                                <div className="col-4">
                                    <i className="fa-solid fa-check"></i>
                                    <p>Electric Window Regulator</p>
                                </div>
                            </div>
                            {/* Seguridad */}
                            <div className="card-title d-flex align-items-center">
                                <i className="fa-solid fa-shield"></i>
                                <p>Security</p>
                            </div>
                            <div className="row row-description">
                                <div className="col-4">
                                    <i className="fa-solid fa-check"></i>
                                    <p>Air Bags</p>
                                </div>
                                <div className="col-4">
                                    <i className="fa-solid fa-check"></i>
                                    <p>Backup Camera</p>
                                </div>
                                <div className="col-4">
                                    <i className="fa-solid fa-check"></i>
                                    <p>ABS brakes</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Div-Box extra de recomendaciones */}
                <div className="last-box">
                    <div className="container">
                        <div className="suggested-title">
                            <h1>We also recommend...</h1>
                        </div>
                        <div className="suggested-list">
                            <div className="row show-cars">
                                {store.cars && store.cars.length > 0 ? (
                                    store.cars.slice(4, 7).map((car) => (
                                        <div className="col-lg-4 col-md-6 col-sm-6 position-relative" key={car.id}>
                                            <div className="favorite">
                                                <i className="fa-regular fa-heart"></i>
                                            </div>
                                            <img src={car.model_picture || ford1} alt="Car" />
                                            <h6>{car.model_type}</h6>
                                            <h2>{car.model_make_id}</h2>
                                            <h5>{car.model_name}</h5>
                                            <br />
                                            <h5 className="year-km-1">
                                                {car.model_year}
                                                <span className="mx-2">&#8226;</span>
                                            </h5>
                                            <h5 className="location-1 pt-2">
                                                <i className="fa-solid fa-location-dot"></i> DrivenS {car.dealership}
                                            </h5>
                                            <div className="price-v2 d-flex justify-content-around mt-4">
                                                <h5>$ {car.model_previous_price}</h5>
                                                <div className="price-line"></div>
                                                <h5 className="green-price">$ {car.model_price}</h5>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No recommended cars available.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CarDetail;
