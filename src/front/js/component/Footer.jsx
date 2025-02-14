import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import book from "../../img/book.png"
import { Link } from "react-router-dom";
import "../../styles/footer.css"

const Footer = () => {

  const rowMod = {
    color: "white",
    backgroundColor: "#006454",
  }

  const linkNoStyle = {
    color: "inherit",
    textDecoration: "none",
  }

  const location = useLocation();
<<<<<<< HEAD
  const pathdenied = ["/login", "/login/sellers", "/register", "/contact-us", "/donation", "/car/", "/become/seller","/seller/cars/get"]
=======
  const pathdenied = ["/login", "/login/sellers", "/register", "/contact-us", "/donation", "/car/", "/become/seller", "/test"]
>>>>>>> ricardo

  if (pathdenied.some(path => location.pathname.startsWith(path))) {
    return null;
  }

  return (
    <div className="row tenth-row" style={rowMod}>
      <div className="col-3 first-line">
        <h4> Home </h4>
        <Link style={linkNoStyle} to={"/become/seller"}> <h4> Become a Seller</h4></Link>
        <Link style={linkNoStyle} to={"/catalog"}><h4> To look for a Car </h4></Link>
        <Link style={linkNoStyle} to={"/sell-your-car"}><h4> Publish your Car </h4></Link>
        <div className="mt-5">
          <i class="fa-brands fa-facebook"></i>
          <i class="fa-brands fa-youtube"></i>
          <i class="fa-brands fa-twitter"></i>
        </div>

      </div>
      <div className="col-3 second-line">
        <h4> Our Car Dealerships </h4>
        <h4 > Contact </h4>
        <h3 > Complaints Book </h3>
        <img src={book} alt="BOOK" />

      </div>
      <div className="col-3">
        <h4> To Ask </h4>
        <h4> Terms and conditions for User Sellers</h4>
        <h4> Terms and conditions for User Buyers</h4>
        <h4> Frequently Asked Questions</h4>
      </div>
      <div className="col-3 fourth-line">
        <h3> Our business hours </h3>
        <h4> Monday | 9AM - 10PM </h4>
        <h4> Tuesday | 9AM - 10PM </h4>
        <h4> Wednesday | 9AM - 10PM </h4>
        <h4> Thursday | 9AM - 10PM </h4>
        <h4> Friday | 9AM - 10PM </h4>
      </div>
      <div className="final-line" >
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