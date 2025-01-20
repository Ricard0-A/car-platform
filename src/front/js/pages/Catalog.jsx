import React from "react";
import "../../styles/catalog.css"

// Test Cars 
import ford1 from "../../img/suggested/ford-1.jpg";
import acura1 from "../../img/suggested/acura-1.png"; // id: 82563

const Catalog =  () => {
    const inputMod = {
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        borderRadius: "20px 0 0 20px", // Redondea solo borde izquierdo
        padding: "10px 20px",
        position: "relative",
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
      };
    return (
        <>
        <div className="container-fluid" style={{marginTop : "100px"}}>
                <div className="row">
                    <div className="col-12 d-flex justify-content-center align-items-center">
                      <div style={{display:"flex", width : "70%"}}>
                          <input
                          type="text"
                          className="form-control"
                          placeholder="What car are you looking for?"
                          style={inputMod}
                          />
                          <button style={buttonMod}>Search</button>
                      </div>
                        
                </div>
                {/* Left Row Filters */}
                <div className="row catalog-filter">
                  <div className="col-3">
                    {/* Unique Div for Filter Prices and others */}
                    <div className="div-filter border shadow">
                        <h5 className="mt-2 pb-2">Price</h5>
                        <h7> Minimo</h7>
                        <input className="form-control" type="text" />
                        <h7> Maximo</h7>
                        <input className="form-control" type="text" />
                        <br />
                        <h5>Brand</h5>
                        <select class="form-select" id="selectOne">
                            <option>Brand</option>
                            <option value="1">Opción 1</option>
                            <option value="2">Opción 2</option>
                            <option value="3">Opción 3</option>
                       </select>
                        <br />
                        <h5>Model</h5>
                        <select class="form-select" id="selectOne">
                            <option>Model</option>
                            <option value="1">Opción 1</option>
                            <option value="2">Opción 2</option>
                            <option value="3">Opción 3</option>
                       </select>
                        <br />
                        <h5>Year</h5>
                        <select class="form-select" id="selectOne">
                            <option>Year</option>
                            <option value="1">Opción 1</option>
                            <option value="2">Opción 2</option>
                            <option value="3">Opción 3</option>
                       </select>
                        <br />
                        <h5>KMS</h5>
                        <select class="form-select" id="selectOne">
                            <option>kms</option>
                            <option value="1">Opción 1</option>
                            <option value="2">Opción 2</option>
                            <option value="3">Opción 3</option>
                       </select>
                        <br />
                        <h5>Localization</h5>
                        <select class="form-select" id="selectOne">
                            <option>Localization</option>
                            <option value="1">Opción 1</option>
                            <option value="2">Opción 2</option>
                            <option value="3">Opción 3</option>
                       </select>
                       <br />
                       <h5>Car Type</h5>
                        <select class="form-select" id="selectOne">
                            <option>Car type</option>
                            <option value="1">Opción 1</option>
                            <option value="2">Opción 2</option>
                            <option value="3">Opción 3</option>
                       </select>
                    </div>
                    
                  </div>
                  {/* CATALOGO DE AUTOS  */}
                  <div className="col-9">
                    <div className="row">
                      <div className="col-4">
                        <img src={ford1} alt="Car"/>
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
                      <div className="col-4">Hola</div>
                      <div className="col-4">Hola</div>
                    </div>
                  </div>

                </div>
                    
            </div>
        </div>
        </>
    )
}


export default Catalog;