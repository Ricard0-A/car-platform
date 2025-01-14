import React, { useContext } from "react";
import { Context } from "../store/appContext";
import backgroundCar from "../../img/WF.jpg";
import backgroundCarTwo from "../../img/backgroundCarTwo.jpg";
import vsgAuto from "../../img/vsgAuto.png";

// Suggested images
import ford1 from "../../img/suggested/ford-1.jpg"; // id: 82769
import acura1 from "../../img/suggested/acura-1.png"; // id: 82563
import audi1 from "../../img/suggested/audi-1.jpg"; // id: 81679
import bentley1 from "../../img/suggested/bentley-1.jpg"; // id: 82207
import cadillac1 from "../../img/suggested/cadillac-1.jpg"; // id: 81756
import buick1 from "../../img/suggested/buick-1.jpg"; // id: 84039
import ford2 from "../../img/suggested/ford-2.jpg"; // id: 84053
import lyser1 from "../../img/suggested/lyser-1.jpg"; // id: 84053
import chevrolet1 from "../../img/suggested/chevrolet-1.jpg"; // id: 81090
import bentley2 from "../../img/suggested/bentley-2.jpg"; // id: 4029
import acura2 from "../../img/suggested/acura-2.jpg"; // id: 69160
import cadillac2 from "../../img/suggested/cadillac-2.jpg"; // id: 73295
// Styles
import "../../styles/home.css";

export const Home = () => {
  // Lógica extra antes del return

  // Objeto CSS ya que img-url tradicional no funciona
  const firstImg = {
    background: `url(${backgroundCar}) center/cover`,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Oscurece la imagen
    backgroundBlendMode: "overlay", // Fusiona la imagen con el sombreado
  };

  const inputMod = {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: "20px 0 0 20px", // Redondea solo borde izquierdo
    padding: "10px 20px",
    position: "relative",
    top: "-150px",
  };

  const buttonMod = {
    fontWeight: "400",
    backgroundColor: "rgb(27, 177, 104)",
    border: "none",
    padding: "10px 20px",
    borderRadius: "0 20px 20px 0", // Redondea solo bordes derechos
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    position: "relative",
    top: "-150px",
  };

  return (
    <>
      {/* Padre de rows */}
      <div className="container-fluid vh-100">
        {/* PRIMERA ROW */}
        <div
          className="row first-row justify-content-center align-items-center"
          style={firstImg}
        >
          <div className="col-12 col-md-8 text-center position-relative">
            {/* Contenedor para input y su button */}
            <div className="d-flex justify-content-center">
              <input 
                type="text"
                className="form-control main-input"
                placeholder="What car are you looking for?"
                style={inputMod}
              />
              <button style={buttonMod}> Search</button>
            </div>
            {/* Mensaje llamativo */}
            <div className="message">
              <p> Find your perfect ride </p>
              <p className="dreams">Now!</p>
            </div>
          </div>
        </div>
        {/* SEGUNDA ROW  */}
        <div className="row second-row h-100 justify-content-center align-items-center">
          <div className="col-12 second-page col-md-8 position-relative">
            <div className="before-reasons">
              <h1>100% Secure Purchase</h1>
              <h2>Quick and Efficient</h2>
              {/* Contenedor flex para la lista y la imagen */}
              <div className="d-flex master-reasons justify-content-between">
                {/* Lista a la izquierda */}
                <ul className="mt-4">
                  {/* Agregamos margen derecho */}
                  <li>
                    <i class="fa-solid fa-check"></i> Warranty
                  </li>
                  <li>
                    <i class="fa-solid fa-check"></i> Safety
                  </li>
                  <li>
                    <i class="fa-solid fa-check"></i> Personalized Service
                  </li>
                  <li>
                    <i class="fa-solid fa-check"></i> Faster
                  </li>
                </ul>
                {/* Imagen a la derecha */}
                <img src={backgroundCarTwo} alt="Auto" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
        {/* TECERA ROW */}
        <div className="row h-100 third-row justify-content-center align-items-center ">
          <div className="col-12 third-page col-md-8 position-relative">
            <h1 className="text-center "> What is DrivenS ?</h1>
            <p className="mt-4">
              DrivenS, Find your dream car quickly and securely. We accept all
              makes and models.
            </p>
          </div>
          <div className="col-12 fourth-page col-md-8 position-relative">
            <h1 className="text-center "> How it works?</h1>
            <p className="mt-4">
              Buying a car is super easy, we guide you through the entire
              process with no hassle. Check the car’s mechanical conditions and
              much more at our Safe Points of DrivenS. We’ll also assist you
              through the Vehicle Transfer process.
            </p>
          </div>
        </div>
        {/* CUARTA ROW */}
        <div className="row h-100 fourth-row justify-content-center align-items-center ">
          <div className="col-12 col-md-8">
            <h1 className="text-center search-by"> Search by category</h1>
          </div>
          {/* CARROS CATEGORIA */}
          <div
            className="h-100 category col-12 col-md-8 d-flex justify-content-center align-items-center"
            style={{ gap: "30px" }}
          >
            <div className="one">
              <h1>SUV</h1>
            </div>
            <div className="two">
              <h1>Hatchback</h1>
            </div>
            <div className="three">
              <h1>Sport</h1>
            </div>
            <div className="four">
              <h1>Hybrid</h1>
            </div>
            <div className="five">
              <h1>Sedan</h1>
            </div>
          </div>
          {/* CARRITO IMAGEN LOGO */}
          <div className="h-50 col-12 category-img col-md-8 justify-content-center">
            {/* ICONO */}
            <div>
              <img src={vsgAuto} alt="" />
            </div>
          </div>
        </div>
        {/* QUINTA ROW */}
        {/* DELETED */}

        {/* SEXTA ROW SIN H-109*/}
        {/* PRIMERA LINEA DE AUTOS RECOMENDADOS */}
        <div className="row h-100 sixth-row justify-content-center align-items-center g-0">
          <h1
            className="text-center position-relative"
            style={{ bottom: "70px", color: "#252e7e" }}
          >
            Suggested
          </h1>
          {/* 1 */}
          <div className="col-3 col-md-3">
            <img src={ford1} alt="kah" />
            <h6>Hatchback</h6>
            <h2>Ford </h2>
            <h5>C-Max Energi</h5>
            <br />
            <h5 className="year-km-1">
              2022<span className="mx-2">&#8226;</span> 30,000 Km
            </h5>
            <h5 className="location-1 pt-2">
              <i class="fa-solid fa-location-dot"></i> DrivenS New York
            </h5>
            {/* Price con FLEX  */}
            <div className="price d-flex justify-content-around mt-4">
              <h5> $ 35,000</h5>
              <h5>$ 29,000</h5>
            </div>
          </div>
          {/* 2 */}
          <div className="col-3 col-md-3">
            <img src={acura1} alt="kah" />
            <h6>Sedan</h6>
            <h2>Acura </h2>
            <h5>ILX</h5>
            <br />
            <h5 className="year-km-1">
              2022<span className="mx-2">&#8226;</span> 30,000 Km
            </h5>
            <h5 className="location-1 pt-2">
              <i class="fa-solid fa-location-dot"></i> DrivenS Dallas
            </h5>
            {/* Price con FLEX  */}
            <div className="price d-flex justify-content-around mt-4">
              <h5> $ 35,000</h5>
              <h5>$ 29,000</h5>
            </div>
          </div>
          {/* 3 */}
          <div className="col-3 col-md-3">
            <img src={audi1} alt="kah" />
            <h6>Hatchback</h6>
            <h2>Audi </h2>
            <h5>A3</h5>
            <br />
            <h5 className="year-km-1">
              2022<span className="mx-2">&#8226;</span> 30,000 Km
            </h5>
            <h5 className="location-1 pt-2">
              <i class="fa-solid fa-location-dot"></i> DrivenS Detroit
            </h5>
            {/* Price con FLEX  */}
            <div className="price d-flex justify-content-around mt-4">
              <h5> $ 35,000</h5>
              <h5>$ 29,000</h5>
            </div>
          </div>
          {/* 4 */}
          <div className="col-3 col-md-3">
            <img src={bentley1} alt="kah" />
            <h6>Hatchback</h6>
            <h2>Bentley </h2>
            <h5>Continental-GT</h5>
            <br />
            <h5 className="year-km-1">
              2022<span className="mx-2">&#8226;</span> 30,000 Km
            </h5>
            <h5 className="location-1 pt-2">
              <i class="fa-solid fa-location-dot"></i> DrivenS Dallas
            </h5>
            {/* Price con FLEX  */}
            <div className="price d-flex justify-content-around mt-4">
              <h5> $ 35,000</h5>
              <h5>$ 29,000</h5>
            </div>
          </div>
        </div>
        {/* SEGUNDA LINEA DE AUTOS RECOMENDADOS */}
        <div className="row seventh-row mt-5 justify-content-center align-items-center g-0">
          {/* 1 */}
          <div className="col-3 col-md-3">
            <img src={cadillac1} alt="kah" />
            <h6>Hatchback</h6>
            <h2>Cadillac </h2>
            <h5>ATS</h5>
            <br />
            <h5 className="year-km-1">
              2022<span className="mx-2">&#8226;</span> 30,000 Km
            </h5>
            <h5 className="location-1 pt-2">
              <i class="fa-solid fa-location-dot"></i> DrivenS Houston
            </h5>
            {/* Price con FLEX  */}
            <div className="price d-flex justify-content-around mt-4">
              <h5> $ 35,000</h5>
              <h5>$ 29,000</h5>
            </div>
          </div>
          {/* 2 */}
          <div className="col-3 col-md-3">
            <img src={buick1} alt="kah" />
            <h6>Hatchback</h6>
            <h2>Buick </h2>
            <h5>Encore</h5>
            <br />
            <h5 className="year-km-1">
              2022<span className="mx-2">&#8226;</span> 30,000 Km
            </h5>
            <h5 className="location-1 pt-2">
              <i class="fa-solid fa-location-dot"></i> DrivenS Chicago
            </h5>
            {/* Price con FLEX  */}
            <div className="price d-flex justify-content-around mt-4">
              <h5> $ 35,000</h5>
              <h5>$ 29,000</h5>
            </div>
          </div>
          {/* 3 */}
          <div className="col-3 col-md-3">
            <img src={ford2} alt="kah" />
            <h6>Hatchback</h6>
            <h2>Ford </h2>
            <h5>Edge</h5>
            <br />
            <h5 className="year-km-1">
              2022<span className="mx-2">&#8226;</span> 30,000 Km
            </h5>
            <h5 className="location-1 pt-2">
              <i class="fa-solid fa-location-dot"></i> DrivenS Dallas
            </h5>
            {/* Price con FLEX  */}
            <div className="price d-flex justify-content-around mt-4">
              <h5> $ 35,000</h5>
              <h5>$ 29,000</h5>
            </div>
          </div>
          {/* 4 */}
          <div className="col-3 col-md-3">
            <img src={lyser1} alt="kah" />
            <h6>Hatchback</h6>
            <h2>Chrysler </h2>
            <h5>200</h5>
            <br />
            <h5 className="year-km-1">
              2022<span className="mx-2">&#8226;</span> 30,000 Km
            </h5>
            <h5 className="location-1 pt-2">
              <i class="fa-solid fa-location-dot"></i> DrivenS New York
            </h5>
            {/* Price con FLEX  */}
            <div className="price d-flex justify-content-around mt-4">
              <h5> $ 35,000</h5>
              <h5>$ 29,000 </h5>
            </div>
          </div>
        </div>
        {/* TECERA LINEA DE AUTOS RECOMENDADOS  */}
        <div className="row eight-row mt-5 justify-content-center align-items-center g-0 ">
          {/* 1 */}
          <div className="col-3 col-md-3">
            <img src={chevrolet1} alt="kah" />
            <h6>Hatchback</h6>
            <h2>Chevrolet </h2>
            <h5>Spark</h5>
            <br />
            <h5 className="year-km-1">
              2022<span className="mx-2">&#8226;</span> 30,000 Km
            </h5>
            <h5 className="location-1 pt-2">
              <i class="fa-solid fa-location-dot"></i> DrivenS Phoenix
            </h5>
            {/* Price con FLEX  */}
            <div className="price d-flex justify-content-around mt-4">
              <h5> $ 35,000</h5>
              <h5>$ 29,000</h5>
            </div>
          </div>
          {/* 2 */}
          <div className="col-3 col-md-3">
            <img src={bentley2} alt="kah" />
            <h6>Hatchback</h6>
            <h2>Bentley </h2>
            <h5>Continental Flying Spur</h5>
            <br />
            <h5 className="year-km-1">
              2022<span className="mx-2">&#8226;</span> 30,000 Km
            </h5>
            <h5 className="location-1 pt-2">
              <i class="fa-solid fa-location-dot"></i> DrivenS New York
            </h5>
            {/* Price con FLEX  */}
            <div className="price d-flex justify-content-around mt-4">
              <h5> $ 35,000</h5>
              <h5>$ 29,000</h5>
            </div>
          </div>
          {/* 3 */}
          <div className="col-3 col-md-3">
            <img src={acura2} alt="kah" />
            <h6>Hatchback</h6>
            <h2>Acura </h2>
            <h5>RDX</h5>
            <br />
            <h5 className="year-km-1">
              2022<span className="mx-2">&#8226;</span> 30,000 Km
            </h5>
            <h5 className="location-1 pt-2">
              <i class="fa-solid fa-location-dot"></i> DrivenS New York
            </h5>
            {/* Price con FLEX  */}
            <div className="price d-flex justify-content-around mt-4">
              <h5> $ 35,000</h5>
              <h5>$ 29,000</h5>
            </div>
          </div>
          {/* 4 */}
          <div className="col-3 col-md-3">
            <img src={cadillac2} alt="kah" />
            <h6>Hatchback</h6>
            <h2>Cadillac </h2>
            <h5>CTS</h5>
            <br />
            <h5 className="year-km-1">
              2022<span className="mx-2">&#8226;</span> 30,000 Km
            </h5>
            <h5 className="location-1 pt-2">
              <i class="fa-solid fa-location-dot"></i> DrivenS Miami
            </h5>
            {/* Price con FLEX  */}
            <div className="price d-flex justify-content-around mt-4">
              <h5> $ 35,000</h5>
              <h5>$ 29,000</h5>
            </div>
          </div>
        </div>
        {/* ROW DE PUNTOS DE ENCUENTROS ( IDK )*/}
        <div className="row  nineth-row mt-5 justify-content-center align-items-center">
          <div className="col-12 text-center ">
            <h1>Take a look at our partner Dealerships.</h1>
          </div>
          {/* <div className="col-12 ">

          </div> */}
        </div>
        {/* ROW DE FOOTER */}
        <div></div>
      </div>
    </>
  );
};
