import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link, useNavigate, Navigate } from "react-router-dom";
import bgCarAdd from "../../img/bg-car-add.jpg";
import "../../styles/seller-add.css";
import NavbarSeller from "../component/navbarSeller.jsx";

//G

const initialCar = {
    model_make_id: "",
    model_name: "",
    model_type: "",
    model_year: "",
    model_body: "",
    model_color: "",
    dealership: "",
    make_country: "",
    model_engine_fuel: "",
    model_amount: "",
    model_previous_price: "",
    model_price: "",
    model_picture: "",
};

const AddCar = () => {
    const navigate = useNavigate();
    const [car, setCar] = useState(initialCar);
    const { store, actions } = useContext(Context);

    const handleChange = ({ target }) => {
        const { name, type } = target;

        let value = target.value;
        // Me aseguro que se envie los datos del formulario como capitalize antes de pasar a backend
        if (type !== "number" && (name === "model_body" || name === "model_color" || name === "model_engine_fuel")) {
            // Mayuscula si o si  
            value = value.split(" ").map(unit => unit.charAt(0).toUpperCase() + unit.slice(1)).join(" ")
        }

        setCar({
            ...car,
            [name]: value,
        });
    };

    const handleGetImage = async (event) => {
        try {
            setCar({
                ...car,
                model_picture: event.target.files[0],
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append("model_make_id", car.model_make_id);
            formData.append("model_name", car.model_name);
            formData.append("model_type", car.model_type);
            formData.append("model_year", car.model_year);
            formData.append("model_body", car.model_body);
            formData.append("model_color", car.model_color);
            formData.append("dealership", car.dealership);
            formData.append("make_country", car.make_country);
            formData.append("model_amount", car.model_amount);
            formData.append("model_engine_fuel", car.model_engine_fuel);
            formData.append("model_previous_price", car.model_previous_price);
            formData.append("model_price", car.model_price);
            formData.append("model_picture", car.model_picture);

            const response = await actions.addCar(formData);

            if (response == 200) {
                setCar(initialCar);
                alert("Car added");
            } else if (response == 400) {
                alert("Incomplete Data");
            } else {
                alert("Please try later");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {store.currentSeller ? (
                <>
                    <NavbarSeller />
                    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light p-3">
                        <h1 className="text-center mb-4">
                            Welcome {store.currentSeller["name"]}
                            <p className="h6 text-muted">Add a new car</p>
                        </h1>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-6 col-md-8 col-sm-12">
                                    <form onSubmit={handleSubmit} className="p-4 border rounded bg-white shadow-sm">
                                        <div className="mb-3">
                                            <label className="form-label">Model Make</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Model Make"
                                                name="model_make_id"
                                                value={car.model_make_id}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Model Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Model Name"
                                                name="model_name"
                                                value={car.model_name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Model Type</label> {/* <-- Nuevo nombre */}
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Model Type"
                                                name="model_type"
                                                value={car.model_type}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Model Year</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Model Year"
                                                name="model_year"
                                                value={car.model_year}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Model Body</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Model Body"
                                                name="model_body"
                                                value={car.model_body}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Model Color</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Model Color"
                                                name="model_color"
                                                value={car.model_color}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Model Amount</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Model Amount"
                                                name="model_amount"
                                                value={car.model_amount}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Model Previous Price</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Model Previous Price"
                                                name="model_previous_price"
                                                value={car.model_previous_price}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Model Price</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Model Price"
                                                name="model_price"
                                                value={car.model_price}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Model Engine Fuel</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Model Engine Fuel"
                                                name="model_engine_fuel"
                                                value={car.model_engine_fuel}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Dealership</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Dealership"
                                                name="dealership"
                                                value={car.dealership}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Make Country</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Make Country"
                                                name="make_country"
                                                value={car.make_country}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Model Picture</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                name="model_picture"
                                                onChange={handleGetImage}
                                            />
                                        </div>

                                        <button type="submit" className="btn btn-success w-100">
                                            Add Car
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : store.currentSeller == null ? (
                <h1>Cargando ruta privada</h1>
            ) : (
                store.currentSeller == false && <Navigate to={"/login/sellers"} />
            )}
        </>
    );
};

export default AddCar;