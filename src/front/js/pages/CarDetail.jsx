import React from "react";
import mainCar from "../../img/suggested/bentley-1.jpg"
import "../../styles/car-detail.css"
import carTest from "../../img/detailCarTest.jpg"
import innerCar from "../../img/inner-photos.jpg"

const CarDetail = () => {

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
                    </div>

                </div>
                <div className="col-6">
                    <div className="right-side">
                        {/* Testeando un div dentro de button para usar space betweeen */}
                        <div className="d-flex justify-content-between" style={{ width: "36rem" }}>
                            <button className="type-car">SUV</button>
                            {/* Div de mini redes sociales */}
                            <div className="socials">
                                <i class="fa-brands fa-facebook"></i>
                                <i class="fa-brands fa-youtube"></i>
                                <i class="fa-brands fa-twitter"></i>
                            </div>
                        </div>
                        <h2>VOLKSWAGEN</h2>
                        <h2 className="model-name">VIRTUS</h2>
                        <div className="first-horizon-line"></div>
                        <div className="features-line">
                            <p>2022</p>
                            <div className="mini-line"></div>
                            <p>Gray</p>
                            <div className="mini-line"></div>
                            <p>Automatic</p>
                            <div className="mini-line"></div>
                            <p>Electric</p>
                        </div>
                        <div className="second-horizon-line"></div>
                        <div className="div-features">
                            <h4>Price including thunder bonus</h4>
                            <h1>$ 20,800</h1>
                            <button className="btn btn-success">Reserve Now</button>
                        </div>
                    </div>
                </div>
                {/* New Row */}
                <div className="box-features">
                    <div className="container">
                        <div className="card-features">
                            <div className="card-title d-flex align-items-center">
                                <i class="fa-solid fa-gear"></i>
                                <p>Features</p>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <h4>Year:</h4>
                                    <p>2018</p>
                                </div>
                                <div className="col-4">
                                    <h4>Model:</h4>
                                    <p>Virtus</p>
                                </div>
                                <div className="col-4">
                                    <h4>Transmission:</h4>
                                    <p>Automatic</p>
                                </div>
                            </div>
                            <div className="row line-2">
                                <div className="col-4">
                                    <h4>Color:</h4>
                                    <p>Platinum Gray</p>
                                </div>
                                <div className="col-4">
                                    <h4>Fuel:</h4>
                                    <p>Electric</p>
                                </div>
                                <div className="col-4">
                                    <h4>Type</h4>
                                    <p>Suv</p>
                                </div>
                            </div>
                            {/* Para mas Features Agrega otra Row Mas! (Antes del Sgte Div) */}
                            <div className="card-title d-flex align-items-center">
                                <i class="fa-solid fa-gear"></i>
                                <p>Equipment</p>
                            </div>
                            <div className="row equipment-row">
                                <div className="col-4">
                                    <i class="fa-solid fa-check"></i>
                                    <p>Air conditioning</p>
                                </div>
                                <div className="col-4">
                                    <i class="fa-solid fa-check"></i>
                                    <p>Backup Camera</p>
                                </div>
                                <div className="col-4">
                                    <i class="fa-solid fa-check"></i>
                                    <p>Air Bags</p>
                                </div>

                            </div>
                            <div className="card-title d-flex align-items-center">
                                <i class="fa-solid fa-shield"></i>
                                <p>Security</p>
                            </div>
                            <div className="row security-row">
                                <div className="col-4">
                                    <i class="fa-solid fa-check"></i>
                                    <p>Air Bags</p>
                                </div>
                                <div className="col-4">
                                    <i class="fa-solid fa-check"></i>
                                    <p>Centered Closing Door</p>
                                </div>
                                <div className="col-4">
                                    <i class="fa-solid fa-check"></i>
                                    <p>ABS brakes</p>
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
