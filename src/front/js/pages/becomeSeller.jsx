import React,{useActionState, useState, useContext} from "react";
import { Context } from "../store/appContext";
import "../../styles/become-seller.css";

const BecomeSeller = () => {
    const{store, actions}=useContext(Context)
    const [email, setEmail]=useState("")

    const handleChange =({target})=>{
        setEmail(target.value)
    }

    const handleSubmit = async (event) =>{
        event.preventDefault()
        console.log(email)
        const response = await actions.sendEmail(email)
    }
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <form className="form-style"
                        onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="labelEmail">Email</label>
                            <input
                                id="labelEmail"
                                className="form-control"
                                placeholder="name@gmail.com"
                                name="email"
                                value={email}
                                onChange={handleChange}
                            />
                            <button className="btn btn-outline-primary w-100" onClick={()=>{actions.sendEmail()}}>Send Email</button>
                        </div>
                    </form>
                    {/* <div className="become-info">
                        <h1 className="our-style">Our Info</h1>
                        <h3 className="email-style">Email:</h3>
                        <div className="email-list">
                            <h4 className="first-email-style">garcacristopher3@gmail.com</h4>
                            <h4 className="second-email-style">ricardoarias4@hotmail.com</h4>
                        <div className="phone-style">
                            <h3 className="phone-style">Phone:</h3>
                            <h4 className="first-phone-style">+593-999088774</h4>
                            <h4 className="second-phone-style">......</h4>
                        </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default BecomeSeller;
