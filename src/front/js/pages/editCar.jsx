import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import NavbarSeller from "../component/navbarSeller.jsx";

const EditContact = () => {
    const { store, actions } = useContext(Context)

    // Crucial!
    const [editCar, setEditCar] = useState("")
    const { idCar } = useParams()

    const handleChange = ({ target }) => {
        setEditCar({
            ...editCar,
            [target.name]: target.value
        })
    }

    // Crucial 
    const getCar = (idCar) => {
        const result = store.cars.find((item) => item.id == idCar)
        setEditCar(result)
    }

    useEffect(() => {
        getCar(idCar)
    }, [store.cars])

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    const handleGetImage = async (event) => {
        try {
            setEditCar({
                ...editCar,
                model_picture: setEditCar.model_picture,
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
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
                            <form className="p-4 border rounded bg-white shadow-sm">
                                <div className="mb-3">
                                    <label className="form-label">Model Make</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Model Make"
                                        name="model_make_id"
                                        value={editCar?.model_make_id}
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
                                        value={editCar?.model_name}
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
                                        value={editCar?.model_type}
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
                                        value={editCar?.model_year}
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
                                        value={editCar?.model_body}
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
                                        value={editCar?.model_color}
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
                                        value={editCar?.model_amount}
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
                                        value={editCar?.model_previous_price}
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
                                        value={editCar?.model_price}
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
                                        value={editCar?.model_engine_fuel}
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
                                        value={editCar?.dealership}
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
                                        value={editCar?.make_country}
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

                                <button type="button" className="btn btn-success w-100" onClick={() => actions.editCar(editCar, idCar)}>
                                    Save
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditContact