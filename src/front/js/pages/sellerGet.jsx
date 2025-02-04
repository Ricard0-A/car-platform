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
                            <div className="row">
                                {store.cars.length > 0 ? (
                                    store.cars.map((car, index) => (
                                        <div className="col-12 col-md-3 col-sm-6">
                                            <div className="d-flex justify-content-center card cards-decoration  ms-4 me-4" style={{ width: "18rem" }}>
                                                <img src={car.model_picture} className="card-img-top image-cards" alt="..." />
                                                <div className="card-body">
                                                    <h5 className="card-title">{car.model_name}</h5>
                                                    <p className="card-text">{car.model_year}</p>
                                                    {car.model_amount<=0 ?(
                                                        <p className="card-text">Out of stock</p>  
                                                    ):
                                                    <p className="card-text">{car.model_amount}</p>
                                                      
                                                }
                                                    <Link to={`/car/${car.id}`} className="btn btn-danger" >Go somewhere</Link>
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