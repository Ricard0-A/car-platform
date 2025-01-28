import React from "react";



const ContactUs = () => {

    const background = {
        position: "relative",
        height: "60vh",

    }
    const colMod = {
        left: "10rem",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "start",
    }


    return (
        <div className="container" style={{ marginTop: "100px" }}>
            <div className="row" style={background}>
                <div className="col-6" style={colMod}>
                    <h2>Contact Us</h2>
                    <h5>You will receive a response during our <br />
                        business hours, Monday through <br /> Saturday</h5>
                </div>
                <div className="col-6">A</div>
            </div>
            {/* <p> Hola! Entiendo que estás buscando una manera de controlar el tamaño y el comportamiento del texto dentro de un elemento, especialmente cuando se trata de saltos de línea.</p> */}
        </div>
    )
}


export default ContactUs;