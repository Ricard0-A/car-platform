import { useContext, useEffect, useState } from "react"
import { Context } from "../store/appContext"
import React from "react"
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
                        <p> <strong>Hola</strong></p>
                    </div>

                </div>
            </div>

        </>
    )
}


export default testingZone;