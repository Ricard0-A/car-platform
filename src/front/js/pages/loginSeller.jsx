import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import bgLoginSeller from "../../img/bg-login-seller.jpg"
import "../../styles/login-seller.css"
const initialSellerState = {
    email: "",
    password: ""
}

const LoginSellers = () => {
    const [seller, setSeller] = useState(initialSellerState)
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()

    const handleChange = ({ target }) => {
        setSeller({
            ...seller,
            [target.name]: target.value
        })
    }

    const handleSubmit = async (event) => {

        try {
            event.preventDefault()
            const response = await actions.loginSellers(seller)

            if (response == 200) {
                alert("Login succes")
                navigate("/seller/cars/get")
            } if (response == 400) {
                alert("Invalid Credentials")
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>

            <img className="col-12 col-md-6 login-bg" src={bgLoginSeller} />
            <div className="container mt-5 bg-login">
                <div className="row justify-content-center">
                    <h1 className="text-center login-letter">Login</h1>
                    <div className="col-12 col-6">
                        <form
                            onSubmit={handleSubmit}
                            className="mt-3"
                        >
                            <div className="form-group mt-3">
                                <label className="login-letter">Email</label>
                                <input
                                    type="email"
                                    className="form-control bg-input"
                                    placeholder="Email"
                                    name="email"
                                    value={seller.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label className="text-login login-letter ">Password</label>
                                <input
                                    type="password"
                                    className="form-control bg-input"
                                    placeholder="Password"
                                    name="password"
                                    value={seller.password}
                                    onChange={handleChange}
                                />

                            </div>
                            <button className="btn btn btn-success mt-3 mb-3 btn-login">Log in</button>
                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}

export default LoginSellers;