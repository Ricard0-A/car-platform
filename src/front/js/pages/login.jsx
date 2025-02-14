import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import bgLogin from "../../img/bg-login.jpg"
import "../../styles/login.css"
const intialUserState = {
    email: "",
    password: ""
}
const Login = () => {
    const [user, setUser] = useState(intialUserState)
    const { actions } = useContext(Context)
    const navigate = useNavigate()

    const handleChange = ({ target }) => {
        setUser({
            ...user,
            [target.name]: target.value
        })
    }

    const handleSubmit = async (event) => {
        try {
            event.preventDefault()
            const response = await actions.login(user);

            if (response == 200) {
                alert("Correct Login")
                navigate("/");
                window.location.href = "/";
            } else if (response == 400) {
                alert("Invalid Credentials")
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <img src={bgLogin} className="img-login" />
            <div className="container mt-5 bg-container-login">
                <div className="row justify-content-center">
                    <h1 className="text-center text-login">Login</h1>
                    <div className="col-12 col-6">
                        <form
                            onSubmit={handleSubmit}
                            className="mt-3"
                        >
                            <div className="form-group mt-3">
                                <label className="text-login">Email</label>
                                <input
                                    type="email"
                                    className="form-control bg-form-login"
                                    placeholder="Email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label className="text-login">Password</label>
                                <input
                                    type="password"
                                    className="form-control bg-form-login"
                                    placeholder="Password"
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                />

                            </div>
                            <button className="btn btn-warning btn-login mt-3 mb-3">Log in</button>
                        </form>
                        <p className="text-login">Don't have an account?<Link to={"/register"} className="link-danger ms-1">Register</Link></p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Login;