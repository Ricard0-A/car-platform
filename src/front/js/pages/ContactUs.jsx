import React from "react";
import "../../styles/contact-us.css"

const ContactUs = () => {

    const background = {
        position: "relative",
        height: "60vh",
    }

    return (
        <div className="container" style={{ marginTop: "100px" }}>
            <div className="row" style={background}>
                <div className="col-12 col-md-6 info-bg" >
                    <h2>Contact Us</h2>
                    <br />
                    <h5>You will receive a response during our <br />
                        business hours, Monday through <br /> Saturday</h5>
                </div>
                <div className="col-12 col-md-6 form-bg">
                    <form action="">
                        <input className="w-75" type="text" placeholder="Full Name" />
                        <input className="w-75" type="text" placeholder="Email" />
                        <textarea className="w-75" name="message" id="" placeholder="Message"></textarea>
                    </form>
                    <button className="w-75 btn btn-success">Send</button>

                </div>
            </div>
        </div>
    )
}


export default ContactUs;