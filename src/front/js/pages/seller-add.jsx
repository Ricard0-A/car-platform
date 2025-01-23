import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate, Navigate } from "react-router-dom";
import bgCarAdd from "../../img/bg-car-add.jpg"
import "../../styles/seller-add.css";


const initialCar = {
    model_make_id: "",
    model_name: "",
    model_trim: "",
    model_year: "",
    model_body: "",
    make_country: ""
}
const AddCar = () => {

    const navigate = useNavigate()
    const [car, setCar] = useState(initialCar)
    const { store, actions } = useContext(Context)
    const handleChange = ({ target }) => {

        setCar({
            ...car,
            [target.name]: target.value
        })

    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData()
            formData.append("model_make_id", car.model_make_id)
            formData.append("model_name", car.model_name)
            formData.append("model_trim", car.model_trim)
            formData.append("model_year", car.model_year)
            formData.append("model_body", car.model_body)
            formData.append("make_country", car.make_country)

            const response = await actions.addCar(formData)
            

            if (response == 200) {
                setCar(initialCar)
                alert("Car added")
            } else if (response == 400) {
                alert("Incomplete Data")
            } else {
                alert("Please try later")
            }
        } catch (error) {
            console.log(error)
        }
    }

    console.log(store)
    return (
        <>
            {
                store.currentSeller ?

                    <div>
                        <img src={bgCarAdd} className="img-car-add" />
                        <h1 className="text-font">Welcome {store.currentSeller["name"]}</h1>
                        <div className="container mt-5 bg-container">
                            <div className="row justify-content-center">
                                <h1 className="text-center text-font">Add New Car</h1>
                                <div className="col-12 col-6">
                                    <form
                                        onSubmit={handleSubmit}
                                        className="mt-3"
                                    >
                                        <div className="form-group mt-3">
                                            <label>Model Make</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Model Make"
                                                name="model_make_id"
                                                value={car.model_make_id}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group mt-3">
                                            <label>Model Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Model Name"
                                                name="model_name"
                                                value={car.model_name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group mt-3">
                                            <label>Model Trim</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Model Trim"
                                                name="model_trim"
                                                value={car.model_trim}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group mt-3">
                                            <label>Model Year</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Model Trim"
                                                name="model_year"
                                                value={car.model_year}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group mt-3">
                                            <label>Model Body</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Model Trim"
                                                name="model_body"
                                                value={car.model_body}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group mt-3">
                                            <label>Make Country</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Make Country"
                                                name="make_country"
                                                value={car.make_country}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <button className="btn btn-warning mt-3 mb-3">Add Car</button>
                                    </form>
                                </div>
                            </div>

                        </div>

                        <Link to={"seller/cars/get"}>
                            <button className="btn btn-primary">See the cars</button>
                        </Link>
                    </div>
                    : store.currentSeller == null ?
                        <h1>Cargando ruta privada</h1>
                        :
                        store.currentSeller == false &&
                        < Navigate to={"/login/sellers"} />
            }


        </>



    )

}


export default AddCar;