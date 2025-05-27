import { useContext, useEffect, useState } from "react"
import { Context } from "../store/appContext"
import React from "react"
import { useNavigate } from "react-router-dom"
import Select from "react-select/base"


const testingZone = () => {
    const flux = useContext(Context)

    const { store, actions } = flux;

    useEffect(() => {
        console.log(store.cars);

    }, [store.cars])

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 mt-5">
                        <h1> Bienvenido </h1>
                        <p> <strong>Esta es la lista de nuestros tipos de autos </strong></p>
                        {store.cars && store.cars.length > 0 ? store.cars.map((unit, index) => (
                            <div key={index}>
                                <p> This is my unit dot Id {unit.id}</p>
                                <p> This is my unit type car {unit.model_type}</p>
                            </div>
                        )) : (
                            <div className="mt-5">
                                <p>
                                    Loading Cars...
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </>
    )
}


export default testingZone;