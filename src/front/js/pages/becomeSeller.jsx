import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "../../styles/become-seller.css";
import becomeImage from "../../img/become-seller-bg.jpg";
import bgSeller2 from "../../img/bg-seller-2.jpg";

const BecomeSeller = () => {
    const [email, setEmail] = useState("");

    const handleChange = ({ target }) => {
        setEmail(target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!email) {
            alert("Please enter a valid email.");
            return;
        }

        const templateParams = {
            name: "Future Dealer",
            email: email,
            time: new Date().toLocaleString(),
            message: `Thanks for your interest!\nClick here to register as a seller:\nhttp://localhost:3000/register/sellers`,
        };

        emailjs
            .send(
                "service_10pv7pr",
                "template_4ovde7f",
                templateParams,
                "TfD71rvJlWtTY883D"
            )
            .then(() => {
                alert("Email sent successfully!");
                setEmail("");
            })
            .catch((error) => {
                console.error("Email send failed:", error);
                alert("Something went wrong.");
            });
    };

    return (
        <>
            <img src={becomeImage} className="become-image-style" />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6">
                        <div className="bg-style">
                            <form className="form-style" onSubmit={handleSubmit}>
                                <div className="form-group input-style">
                                    <label htmlFor="labelEmail">Email</label>
                                    <input
                                        id="labelEmail"
                                        type="email"
                                        className="form-control"
                                        placeholder="Please Enter Your Email"
                                        value={email}
                                        onChange={handleChange}
                                    />
                                    <button type="submit" className="btn btn-outline-success w-100 mt-3">
                                        Send Email
                                    </button>
                                </div>

                                <h3 className="our-info-style">Our contact info</h3>

                                <div className="btn-group drop-style">
                                    <button className="btn dropdown-toggle btn-main-style" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fa-solid fa-envelope"></i>
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><p className="mx-3">garcacristopher3@gmail.com</p></li>
                                        <li><p className="mx-3">ricardoarias4@hotmail.com</p></li>
                                    </ul>
                                </div>

                                <div className="btn-group drop-style-phone">
                                    <button className="btn dropdown-toggle btn-phone-style" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fa-solid fa-phone"></i>
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><p className="dropdown-item">+1 (202) 555-0143</p></li>
                                        <li><p className="dropdown-item">+593-999088774</p></li>
                                        <li><p className="dropdown-item">+49 152 34567890</p></li>
                                    </ul>
                                </div>

                                <div className="btn-group drop-style-instagram">
                                    <button className="btn dropdown-toggle btn-instagram-style" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fa-brands fa-instagram instagram-icon"></i>
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><p className="dropdown-item">@DrivenS_Oficial</p></li>
                                        <li><p className="dropdown-item">@DrivenS_Dealership</p></li>
                                        <li><p className="dropdown-item">@DrivenS_Autos</p></li>
                                    </ul>
                                </div>

                                <div className="btn-group drop-style-address">
                                    <button className="btn btn-address-style dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fa-solid fa-location-dot"></i>
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><p className="dropdown-item">Los Ángeles, EE.UU.</p></li>
                                        <li><p className="dropdown-item">Buenos Aires, Argentina</p></li>
                                        <li><p className="dropdown-item">More Soon...</p></li>
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
