import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import "../../styles/contact-us.css";

const ContactUs = () => {
    const [formValues, setFormValues] = useState({
        full_name: "",
        user_email: "",
        message: ""
    });

    const [statusMessage, setStatusMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const templateParams = {
            user_name: formValues.full_name,
            user_email: formValues.user_email,
            message: formValues.message,
            to_email: "testeosale@gmail.com"
        };

        emailjs
            .send(
                "service_10pv7pr",
                "template_80ehw99",
                templateParams,
                "TfD71rvJlWtTY883D"
            )
            .then((result) => {
                console.log("SUCCESS!", result.text);
                setFormValues({
                    full_name: "",
                    user_email: "",
                    message: ""
                });
                setStatusMessage({ type: "success", text: "Message sent successfully!" });
            })
            .catch((error) => {
                console.log("FAILED...", error.text);
                setStatusMessage({ type: "error", text: " Something went wrong." });
            });
    };

    useEffect(() => {
        if (statusMessage) {
            const timeout = setTimeout(() => setStatusMessage(null), 5000);
            return () => clearTimeout(timeout);
        }
    }, [statusMessage]);

    const background = {
        position: "relative",
        height: "60vh",
        paddingTop: "60px"
    };

    return (
        <div className="container" style={{ marginTop: "100px" }}>
            <div className="row" style={background}>
                <div className="col-12 col-md-6 info-bg">
                    <h1>Contact Us</h1>
                    <br />
                    <h5>You will receive a response during our <br />
                        business hours, Monday through <br /> Saturday</h5>
                </div>
                <div className="col-12 col-md-6 form-bg">
                    <form onSubmit={handleSubmit}>
                        <input
                            className="w-75 mb-2"
                            type="text"
                            placeholder="Full Name"
                            name="full_name"
                            value={formValues.full_name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="w-75 mb-2"
                            type="email"
                            placeholder="Email"
                            name="user_email"
                            value={formValues.user_email}
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            className="w-75 mb-2"
                            name="message"
                            placeholder="Message"
                            value={formValues.message}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit" className="w-75 btn btn-success">Send</button>
                    </form>

                    {/* Alerta visual con Bootstrap */}
                    {statusMessage && (
                        <div className={`alert mt-3 ${statusMessage.type === "success" ? "alert-success" : "alert-danger"}`} role="alert" style={{ width: '75%' }}>
                            {statusMessage.text}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
