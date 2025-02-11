import React from "react";
import sellIt from "../../img/vende-auto.jpg";
import { Link } from "react-router-dom";

const SellYourCar = () => {
    return (
        <div className="position-relative text-white text-center" style={{
            backgroundImage: `url(${sellIt})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "600px"
        }}>
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"></div>
            <div className="container position-relative h-100 d-flex align-items-center justify-content-center">
                <div className="row w-100">
                    <div className="col-md-8 offset-md-2 p-5 text-center bg-dark bg-opacity-75 rounded">
                        <h1 className="fw-bold display-5">Reach More Buyers, Sell Faster!</h1>
                        <p className="lead">Join the #1 platform for dealerships and increase your sales</p>
                        <div className="d-flex justify-content-around my-4">
                            <div className="text-center">
                                <p><strong>Expand Your Reach</strong><br />Connect with thousands of potential buyers daily</p>
                            </div>
                            <div className="text-center">
                                <p><strong>Hassle-Free Selling</strong><br />Simple listings and secure payment processing</p>
                            </div>
                            <div className="text-center">
                                <p><strong>Premium Dealer Perks</strong><br />Get featured and stand out from competitors</p>
                            </div>
                        </div>
                        <Link to="/become/seller" className="btn btn-success btn-lg">Start Selling Today</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellYourCar;
