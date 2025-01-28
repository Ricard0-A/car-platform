import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import bgFooter from "../../img/footer-bg.jpg"


const Footer = () => {

  const rowMod = {
    color: "white",
    backgroundColor: "#006454",
  }

  const backgroundImg = {
    borderRadius: "10px",
    height: "135px",
    width: "270px",
    backgroundImage: `url(${bgFooter})`,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Oscurece la imagen
    backgroundBlendMode: "overlay", // Fusiona la imagen con el sombreado

  }

  const location = useLocation();
  const pathdenied = ["/login", "/login/sellers", "/register", "/contact-us"]

  if (pathdenied.includes(location.pathname)) {
    return null
  }

  return (
    <div className="row tenth-row" style={rowMod}>
      <div className="col-3 first-line">
        <h4> Home </h4>
        <h4> Sell my Car </h4>
        <h4> To look for a Car </h4>
      </div>
      <div className="col-3">
        <h4> Publish your Car </h4>
        <h4> Contact </h4>
        <h4> Our Car Dealerships </h4>
        <div style={backgroundImg}></div>

      </div>
      <div className="col-3">
        <h4> To Ask </h4>
        <h4> Terms and conditions for User Sellers</h4>
        <h4> Terms and conditions for User Buyers</h4>
        <h4> Frequently Asked Questions</h4>
      </div>
      <div className="col-3">
        <h3 className="fs-4" style={{ marginBottom: "16px" }}> Our business hours </h3>
        <h4> Monday | 9AM - 10PM </h4>
        <h4> Tuesday | 9AM - 10PM </h4>
        <h4> Wednesday | 9AM - 10PM </h4>
        <h4> Thursday | 9AM - 10PM </h4>
        <h4> Friday | 9AM - 10PM </h4>
      </div>
      <div className="final-line" style={{ marginTop: "22px" }}>
      </div>
      <div className="col-12 final-logo">
        <div className="text-center">
          <i className="green fa-brands fa-drupal fs-1"></i>
          <i className="fa-brands fa-stumbleupon fs-2"></i>
          DrivenS
        </div>
      </div>
    </div>
  )

};

export default Footer;