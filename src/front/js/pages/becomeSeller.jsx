import React, { useActionState, useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/become-seller.css";
import becomeImage from "../../img/become-seller-bg.jpg"
import bgSeller2 from "../../img/bg-seller-2.jpg"

const BecomeSeller = () => {
    const { store, actions } = useContext(Context)
    const [email, setEmail] = useState("")

    const handleChange = ({ target }) => {
        setEmail(target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(email)
        const response = await actions.sendEmail(email)
    }


    return (
        <>
            <img src={becomeImage} className="become-image-style" />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6">
                        <div className="bg-style">
                            <form className="form-style"
                                onSubmit={handleSubmit} >
                                <div className="form-group input-style ">
                                    {/* <h1 className="mb-5">To become a member of our family</h1> */}
                                    <label htmlFor="labelEmail">Email</label>
                                    <input
                                        id="labelEmail"
                                        type="email"
                                        className="form-control"
                                        placeholder="Please Enter Your Email"
                                        name="email"
                                        value={email}
                                        onChange={handleChange}
                                    />
                                    <button className="btn btn-outline-success w-100 mt-3" onClick={() => { actions.sendEmail() }}>Send Email</button>
                                </div>
                                <h3 className="our-info-style">Our contact info</h3>
                                <div className="btn-group drop-style">
                                    <button className="btn dropdown-toggle btn-main-style" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="fa-solid fa-envelope"></i>
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><p className="mx-3">garcacristopher3@gmail.com</p></li>
                                        <li><p className="mx-3">ricardoarias4@hotmail.com</p></li>
                                    </ul>
                                </div>
                                <div className="btn-group drop-style-phone">
                                    <button className="btn  dropdown-toggle btn-phone-style" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="fa-solid fa-phone"></i>
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><p className="dropdown-item">+1 (202) 555-0143</p></li>
                                        <li><p className="dropdown-item">+593-999088774</p></li>
                                        <li><p className="dropdown-item">+49 152 34567890</p></li>
                                    </ul>
                                </div>

                                <div class="btn-group drop-style-instagram">
                                    <button className="btn dropdown-toggle btn-instagram-style" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fa-brands fa-instagram instagram-icon"></i>
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><p className="dropdown-item">@DrivenS_Oficial</p></li>
                                        <li><p className="dropdown-item">@DrivenS_Dealership</p></li>
                                        <li><p className="dropdown-item">@DrivenS_Autos</p></li>
                                    </ul>
                                </div>

                                <div class="btn-group drop-style-address">
                                    <button class="btn btn-address-style dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="fa-solid fa-location-dot"></i>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><p class="dropdown-item">Los Ángeles, EE.UU.</p></li>
                                        <li><p class="dropdown-item">Buenos Aires, Argentina</p></li>
                                        <li><p class="dropdown-item">More Soon...</p></li>
                                    </ul>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BecomeSeller;
