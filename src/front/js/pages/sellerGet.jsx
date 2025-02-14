import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../../styles/seller-get.css"
import NavbarSeller from "../component/navbarSeller.jsx";


const GetCar = () => {

    const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    useEffect(() => {
        actions.getCar()
    }, [])
    return (
        <>
            {
                store.currentSeller ? (
                    <>
                        <NavbarSeller />
                        <div className="container get-orientation">
                            <h1 className="get-text">Car List</h1>
                            <div className="donation-style">
                                                <Link to={"/donation"} className="btn btn-donation BTN">
                                                    <button className="Btn">
                                                        Donate
                                                        <svg className="svgIcon" viewBox="0 0 576 512"><path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path></svg>
                                                    </button>
                                                </Link>
                                            </div>
                            <div className="row">
                                {store.cars.length > 0 ? (
                                    store.cars.map((car, index) => (
                                        <div className="col-12 col-md-3 col-sm-6">
                                            
                                            <div className="card  cards-decoration" style={{ minWidth: "18rem" }}>
                                                <img src={car.model_picture} className="card-img-top image-cards" alt="..." />
                                                <div className="card-body">
                                                    <h5 className="card-title">{car.model_name}</h5>
                                                    <p className="card-text">{car.model_year}</p>
                                                    {car.model_amount <= 0 ? (
                                                        <p className="card-text">Out of stock</p>
                                                    ) :
                                                        <p className="card-text">{car.model_amount}</p>

                                                    }

                                                    <Link to={`/car/${car.id}`} className="btn btn-success w-100 see-details-style">See Details</Link>
                                          </div>
                                            </div>
                                        </div>

                                    ))

                                ) : (
                                    <h1>No Cars Available</h1>
                                )}
                            </div>

                        </div>
                    </>
                ) : store.currentSeller === null ? (
                    <h1>Loading Private Route</h1>
                ) : (
                    <Navigate to={"/login/sellers"} />
                )


            }

        </>
    )
}

export default GetCar;