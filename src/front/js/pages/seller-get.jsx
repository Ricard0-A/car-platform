import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

const GetCar = () => {

    const { store, actions } = useContext(Context)

    useEffect(() => {
        actions.getCar()
    }, [])
    return (
        <>
            {
                store.currentSeller ?
                    <h1>Hola desde el Get</h1>
                    : store.currentSeller == null ?
                        <h1>Cargando ruta privada</h1>
                        :
                        store.currentSeller == false &&
                        < Navigate to={"/login/sellers"} />
            }


        </>
    )
}

export default GetCar;