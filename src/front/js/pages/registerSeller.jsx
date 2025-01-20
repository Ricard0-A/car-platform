import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import bgRegisterSeller from "../../img/bg-register-seller.jpg"
import "../../styles/register-seller.css"
const initialSeller = {
    name: "",
    email: "",
    password: "",
    country: ""
}
const RegisterSellers = () => {
    const [seller, setSeller] = useState(initialSeller)
    const { actions } = useContext(Context)

    const handleChange = ({ target }) => {
        setSeller({
            ...seller,
            [target.name]: target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", seller.name);
        formData.append("email", seller.email);
        formData.append("password", seller.password);
        formData.append("country", seller.country);

        const response = await actions.registerSellers(formData)

        try {
            if (response == 200) {
                setSeller(initialSeller)
                alert("User create")
            } else if (response == 400) {
                alert("This user already exist")
            } else {
                alert("Please try later")
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <img src={bgRegisterSeller} className="img-seller" />
            <div className="container mt-5 bg-seller">
                <div className="row justify-content-center">
                    <h1 className="text-center letter-seller">Register</h1>
                    <div className="col-12 col-md-6">
                        <div className="bgColor">
                            <form
                                onSubmit={handleSubmit}
                                className="mt-3"
                            >
                                <div className="form-group mt-3">
                                    <label className="letter-seller">Name</label>
                                    <input
                                        type="text"
                                        className="form-control bg-input-seller letter-seller"
                                        placeholder="Name"
                                        name="name"
                                        value={seller.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label className="letter-seller">Email</label>
                                    <input
                                        type="email"
                                        className="form-control bg-input-seller letter-seller "
                                        placeholder="Email"
                                        name="email"
                                        value={seller.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label className="letter-seller">Password</label>
                                    <input
                                        type="password"
                                        className="form-control bg-input-seller letter-seller"
                                        placeholder="Password"
                                        name="password"
                                        value={seller.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label className="letter-seller">Country</label>
                                    <div className="input-group mb-3">
                                        <label className="input-group-text letter-seller bg-input-seller">Country</label>
                                        <select
                                            className="form-select bg-input-seller "
                                            name="country"
                                            value={seller.country}
                                            onChange={handleChange}
                                        >
                                            <option className="select-text" value="">
                                                Choose...
                                            </option>
                                            <option className="select-text" value="USA">
                                                USA
                                            </option>
                                            <option className="select-text" value="Canada">
                                                Canada
                                            </option>
                                            <option className="select-text" value="Ecuador">
                                                Ecuador
                                            </option>
                                            <option className="select-text" value="Argentina">
                                                Argentina
                                            </option>
                                            <option className="select-text" value="Chile">
                                                Chile
                                            </option>
                                            <option className="select-text"  value="Brazil">
                                                Brazil
                                            </option>
                                            <option className="select-text" value="Germany">
                                                Germany
                                            </option>
                                            <option className="select-text" value="Spain">
                                                Spain
                                            </option>
                                            <option className="select-text" value="Japan">
                                                Japan
                                            </option>
                                            <option className="select-text" value="China">
                                                China
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary mt-3 mb-2 letter-seller btn-register-seller ">
                                    Register
                                </button>
                            </form>
                            <div>
                                <p className="letter-seller">Already have an acoount?<Link to={"/login"} className="ms-2 link-success">Log in</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterSellers;