import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { useParams } from "react-router-dom";
import NavbarSeller from "../component/navbarSeller.jsx";
import "../../styles/car-detail.css"


const CarDetailSeller = () => {
    const { store, actions } = useContext(Context)
    const { idCar } = useParams()

    const [carDetail, setCarDetail] = useState({})

    const findCar = () => {
        const result = store.cars.find((item) => item.id == idCar)
        setCarDetail(result||{})
    }

    useEffect(() => {
        findCar()
    }, [store.cars])
    return (
        <>
            <NavbarSeller />
            <div className="row ">
                <div className="col-12 col-md-6 ">
                    <div className="main-bg-style">
                        <div className="d-flex justify-content-center  ">
                            <img className="img-orientation" src={carDetail?.model_picture} />
                            <div className="main-info-style">
                                <h1 className="name-style"><b>{carDetail?.model_name}</b></h1>
                                <p className="trim-style">{carDetail?.model_trim}</p>
                                <h2 className="price-style"><b>${carDetail?.model_price}</b></h2>
                            </div>

                        </div>
                    </div>
                    <div className="info-style">
                        <p className="text-style"><b className="me-3">Model Make:</b>{carDetail?.model_make_id}</p>
                        <p className="ms-5 text-style"><b>Year:</b>{carDetail?.model_year}</p>
                        <p className="ms-5 text-style"><b>Body: </b>{carDetail?.model_body}</p>
                        <p className="ms-5 text-style"><b className="me-1">Country:</b>{carDetail?.make_country}</p>
                    </div>
                    <div className="amount-info-style">
                        <p className="text-style"><b className="me-3">Available units:</b><br /></p>
                        <div>
                            {
                                carDetail.model_amount > 0 ? (
                                    <p className="amount-text-style">{carDetail?.model_amount}</p>
                                ) :
                                    <p className="amount-text-style">No Available Units</p>


                            }
                        </div>

                    </div>
                </div>
            </div>
        </>

    )

}

export default CarDetailSeller;