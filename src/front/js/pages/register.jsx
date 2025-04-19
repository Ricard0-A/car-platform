import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/register.css";
import bgRegister from "../../img/bg-register.jpg"
import { Link } from "react-router-dom";

const initialUser = {
    name: "",
    email: "",
    password: "",
    phone_number: "",
    country: "",
    avatar: ""
};

const Register = () => {
    const [user, setUser] = useState(initialUser);
    const { actions } = useContext(Context);

    const handleChange = ({ target }) => {
        setUser({
            ...user,
            [target.name]: target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", user.name);
        formData.append("email", user.email);
        formData.append("password", user.password);
        formData.append("phone_number", user.phone_number);
        formData.append("country", user.country);
        formData.append("avatar", user.avatar)

        const response = await actions.register(formData);

        if (response === 200) {
            setUser(initialUser);
            alert("User create");


        } else if (response === 401) {
            alert("User already exists");
        } else {
            alert("Please try later");
        }
    };

    return (
        <>
            <div className="container-fluid bg-container-register" style={{ backgroundImage: 'url(/login-bg.webp' }}>
                <div className="row justify-content-center">
                    <h1 className="text-center letterForm">Register</h1>
                    <Link to="/login"><img src="/green-arrow.png" alt="green-arrow" /></Link>
                    <div className="col-12 col-md-6">
                        <div className="main-form">
                            <form
                                onSubmit={handleSubmit}
                                className="mt-3"
                            >
                                <div className="form-group mt-3">
                                    <label className="letterForm">Name</label>
                                    <input
                                        type="text"
                                        className="form-control bgForm"
                                        placeholder="Name"
                                        name="name"
                                        value={user.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label className="letterForm">Email</label>
                                    <input
                                        type="email"
                                        className="form-control bgForm"
                                        placeholder="Email"
                                        name="email"
                                        value={user.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label className="letterForm">Password</label>
                                    <input
                                        type="password"
                                        className="form-control bgForm"
                                        placeholder="Password"
                                        name="password"
                                        value={user.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label className="letterForm">Phone Number</label>
                                    <input
                                        type="text"
                                        className="form-control bgForm"
                                        placeholder="Phone Number"
                                        name="phone_number"
                                        value={user.phone_number}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label className="letterForm">Country</label>
                                    <div className="input-group mb-3">
                                        <label className="input-group-text bgForm">Country</label>
                                        <select
                                            className="form-select select-register letterForm"
                                            name="country"
                                            value={user.country}
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
                                            <option className="select-text" value="Brazil">
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
                                            <option className="select-text" value="Other">
                                                Other
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="select-register">Avatar</label>
                                        <input
                                            className="form-control select-register"
                                            type="file"
                                            placeholder="Imagen"
                                            onChange={(event) => {
                                                setUser({ ...user, avatar: event.target.files[0] })
                                            }}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-danger mt-3 mb-2 register-btn">
                                        Register
                                    </button>
                                </div>
                            </form>
                            <div>
                                <p className="letterForm">Already have an acoount?<Link to={"/login"} className="ms-2 link-warning">Log in</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
