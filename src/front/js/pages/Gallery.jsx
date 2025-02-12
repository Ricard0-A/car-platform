import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';

import "../../styles/gallery.css"

const Gallery = () => {
    const { store, actions } = useContext(Context);
    const [favoriteCars, setFavoriteCars] = useState([]);
    const [allCars, setAllCars] = useState([]);

    useEffect(() => {
        const loadFavoritesAndCars = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/cars`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const allCarsData = await response.json();
                setAllCars(allCarsData);

                const favorites = await actions.loadFavorites();

                if (favorites) {
                    setFavoriteCars(favorites);
                }

            } catch (error) {
                console.error("Error loading cars or favorites:", error);
            }
        };

        if (store.currentUser) {
            loadFavoritesAndCars();
        }
    }, [store.currentUser]);

    const handleDelete = async (carId) => {
        try {
            const success = await actions.deleteFavorite(carId);
            if (success) {
                const userId = store.currentUser.id;
                const updatedFavorites = await actions.loadFavorites(userId);
                if (updatedFavorites) {
                    setFavoriteCars(updatedFavorites);
                }
            }
        } catch (error) {
            console.error("Error deleting favorite:", error);
        }
    };

    return (
        <div className="container-fluid" style={{ marginTop: "88px", height: "100vh" }}>
            <div className="row d-flex justify-content-center" style={{ height: "86%" }}>
                {allCars && allCars.length > 0 ? (
                    favoriteCars && favoriteCars.length > 0 ? (
                        favoriteCars.map(favorite => {
                            const carDetails = allCars.find(car => car.id === favorite.car_id);

                            return carDetails ? (
                                <div className="col-6" key={favorite.car_id}>
                                    <div className="car-container">
                                        <div className="image-container">
                                            <img src={carDetails.model_picture} alt="Main Car Image" />
                                        </div>
                                        <div className="info-container">
                                            <p className="type">{carDetails.model_type}</p>
                                            <h2 className="brand">{carDetails.model_make_id}</h2>
                                            <h2 className="model">{carDetails.model_name}</h2>
                                            <p className="car-price">${" "} {carDetails.model_price}</p>
                                            <div className="details-button-container">
                                                <Link to="/catalog/car-detail">
                                                    <button className="btn btn-primary details-button">
                                                        View Details
                                                    </button>
                                                </Link>

                                            </div>
                                        </div>
                                        <div className="delete-button-container"> {/* Nuevo contenedor para el semicírculo */}
                                            <button className="delete-button" onClick={() => handleDelete(favorite.car_id)}>
                                                <i className="fas fa-trash-alt"></i> {/* Icono de papelera */}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p>Car details not found
                                    .</p>
                            );
                        })
                    ) : (
                        <p>Favorite cars not found.</p>
                    )
                ) : (
                    <p>Loading Cars...</p>
                )}
            </div>
        </div>
    );
};

export default Gallery;