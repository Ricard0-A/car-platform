import mainCar from "../../img/suggested/bentley-1.jpg"
import "../../styles/car-detail.css"
import carTest from "../../img/detailCarTest.jpg"
import cadillac1 from "../../img/suggested/cadillac-1.jpg"
import chevrolet1 from "../../img/suggested/chevrolet-1.jpg"
import ford1 from "../../img/suggested/ford-1.jpg"
import innerCar from "../../img/inner-photos.jpg"
import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { useParams } from "react-router-dom";

const CarDetail = () => {

    const { store, actions } = useContext(Context)
    const { idCar } = useParams()

    const [carDetail, setCarDetail] = useState({})

    const findCar = () => {
        const result = store.cars.find((item) => item.id == idCar)
        setCarDetail(result || {})
    }

    useEffect(() => {
        findCar()
    }, [store.cars])




    const innerPhoto = {
        background: `url(${innerCar}) center/contain`,
    }

    return (
        <div className="container-fluid" style={{ marginTop: "88px", height: "100vh" }}>
            <div className="row d-flex justify-content-center" style={{ height: "86%" }}>
                <div className="col-6">
                    <div className="left-side">
                        <img src={carTest} alt="Main Car Image" />
                        <div className="photos">
                            <div className="inner-photos" style={innerPhoto}>
                                <div className="photos-number">
                                    <p>10</p>
                                </div>
                                <p>Photos</p>
                            </div>
                        </div>
                        <div className="big-favorites">
                            <i class="fa-regular fa-heart"></i>
                            <p>Save</p>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="right-side">
                        <div className="d-flex justify-content-between" style={{ width: "36rem" }}>
                            <button className="type-car">{carDetail?.model_type}</button>
                            <div className="socials">
                                <i class="fa-brands fa-facebook"></i>
                                <i class="fa-brands fa-youtube"></i>
                                <i class="fa-brands fa-twitter"></i>
                            </div>
                        </div>
                        <h2>{carDetail.model_name_id}</h2>
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
                            <h1>{carDetail?.model_price}</h1>
                            <button className="btn btn-success">Reserve Now</button>
                        </div>
                    </div>
                </div>
                {/* Div-Box de todas las caracteristicas del auto */}
                <div className="box-features">
                    <div className="container" style={{ paddingBottom: "26px" }}>
                        <div className="card-features">
                            <div className="card-title d-flex align-items-center">
                                <i class="fa-solid fa-gear"></i>
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
                            {/* Para mas Features Agrega otra Row Mas! (Antes del Sgte Div) */}
                            <div className="card-title d-flex align-items-center">
                                <i class="fa-solid fa-magnifying-glass"></i>
                                <p>Equipment</p>
                            </div>
                            <div className="row row-description">
                                <div className="col-4">
                                    <i class="fa-solid fa-check"></i>
                                    <p>Air conditioning</p>
                                </div>
                                <div className="col-4">
                                    <i class="fa-solid fa-check"></i>
                                    <p>Adjustable Wheel</p>
                                </div>
                                <div className="col-4">
                                    <i class="fa-solid fa-check"></i>
                                    <p>Electric Window Regulator</p>
                                </div>

                            </div>
                            <div className="card-title d-flex align-items-center">
                                <i class="fa-solid fa-shield"></i>
                                <p>Security</p>
                            </div>
                            <div className="row row-description">
                                <div className="col-4">
                                    <i class="fa-solid fa-check"></i>
                                    <p>Air Bags</p>
                                </div>
                                <div className="col-4">
                                    <i class="fa-solid fa-check"></i>
                                    <p>Backup Camera</p>
                                </div>
                                <div className="col-4">
                                    <i class="fa-solid fa-check"></i>
                                    <p>ABS brakes</p>
                                </div>

                            </div>
                        </div>


                    </div>
                </div>
                {/* Div-Box extra de ultimas de recomendaciones de autos */}
                <div className="last-box">
                    <div className="container">
                        <div className="suggested-title">
                            <h1>We also recommend...</h1>
                        </div>
                        <div className="suggested-list">
                            <div className="row show-cars">
                                <div className="col-lg-4 col-md-6 col-sm-6 position-relative">
                                    <div className="favorite">
                                        <i class="fa-regular fa-heart"></i>
                                    </div>
                                    <img src={ford1} alt="Car" />
                                    <h6>Hatchback</h6>
                                    <h2>Ford</h2>
                                    <h5>Dungeon</h5>
                                    <br />
                                    <h5 className="year-km-1">
                                        2022<span className="mx-2">&#8226;</span> 8,000 Km
                                    </h5>
                                    <h5 className="location-1 pt-2">
                                        <i class="fa-solid fa-location-dot"></i> DrivenS New
                                        York
                                    </h5>
                                    <div className="price-v2 d-flex justify-content-around mt-4">
                                        <h5>$ 48,000</h5>
                                        <div className="price-line"></div>
                                        <h5 className="green-price">$ 32,000</h5>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-6 position-relative">
                                    <div className="favorite">
                                        <i class="fa-regular fa-heart"></i>
                                    </div>
                                    <img src={cadillac1} alt="Car" />
                                    <h6>Hatchback</h6>
                                    <h2>Bentley</h2>
                                    <h5>Continental Flying Spur</h5>
                                    <br />
                                    <h5 className="year-km-1">
                                        2022<span className="mx-2">&#8226;</span> 8,000 Km
                                    </h5>
                                    <h5 className="location-1 pt-2">
                                        <i class="fa-solid fa-location-dot"></i> DrivenS New
                                        York
                                    </h5>
                                    <div className="price-v2 d-flex justify-content-around mt-4">
                                        <h5>$ 48,000</h5>
                                        <div className="price-line"></div>
                                        <h5 className="green-price">$ 32,000</h5>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-6 position-relative">
                                    <div className="favorite">
                                        <i class="fa-regular fa-heart"></i>
                                    </div>
                                    <img src={chevrolet1} alt="Car" />
                                    <h6>Hatchback</h6>
                                    <h2>Chevrolet</h2>
                                    <h5>Sapphire</h5>
                                    <br />
                                    <h5 className="year-km-1">
                                        2022<span className="mx-2">&#8226;</span> 8,000 Km
                                    </h5>
                                    <h5 className="location-1 pt-2">
                                        <i class="fa-solid fa-location-dot"></i> DrivenS New
                                        York
                                    </h5>
                                    <div className="price-v2 d-flex justify-content-around mt-4">
                                        <h5>$ 48,000</h5>
                                        <div className="price-line"></div>
                                        <h5 className="green-price">$ 32,000</h5>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default CarDetail;
