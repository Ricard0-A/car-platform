import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../../styles/seller-get.css"
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
                    <div className="container get-orientation">
                        <h1>Car List</h1>
                        <div className="row">
                            {store.cars.length > 0 ? (
                                store.cars.map((car, index) => (
                                    <div className="col-12 col-6 col-md-3">
                                        <div className="card cards-decoration" style={{width:"18rem"}}>
                                            <img src="..." className="card-img-top" alt="..."/>
                                                <div className="card-body">
                                                    <h5 className="card-title">{car.model_name}</h5>
                                                    <p className="card-text">{car.model_year}</p>
                                                    <Link to={`/car/${car.id}`} className="btn btn-danger" >Go somewhere</Link>
                                                </div>
                                        </div>
                                    </div>

                                ))
                            ): (
                                <h1>No Cars Available</h1>
                            )}
                        </div>

                    </div>
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