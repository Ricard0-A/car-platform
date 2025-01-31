import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

// Mi codigo 
import Navbar from "../../front/js/component/Navbar.jsx"
import { Home } from "./pages/Home.jsx";
import Catalog from "./pages/Catalog.jsx";


import Register from "./pages/register.jsx";
import Login from "./pages/login.jsx";
import RegisterSellers from "./pages/registerSeller.jsx";
import LoginSellers from "./pages/loginSeller.jsx";
import AddCar from "./pages/sellerAdd.jsx";
import GetCar from "./pages/sellerGet.jsx";
import injectContext from "./store/appContext";
import navbarSeller from "./component/navbarSeller.jsx";
import Footer from "./component/Footer.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import CarDetailSeller from "./pages/CarDetailSeller.jsx";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
        return <BackendURL />;


    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    {/* <NavbarSeller /> Este nav va en su respectivo home de Sellers  */}
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Catalog />} path="/catalog" />
                        <Route element={<Register />} path="/register" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<RegisterSellers />} path="/register/sellers" />
                        <Route element={<LoginSellers />} path="/login/sellers" />

                        <Route element={<AddCar />} path="/seller/cars" />
                        <Route element={<GetCar />} path="seller/cars/get" />
                        <Route element={<CarDetailSeller/>} path="car/:idCar"/>
                        <Route element={<ContactUs />} path="/contact-us" />
                        <Route element={<h1 style={{ marginTop: "350px" }}>Not found!</h1>} path="*" />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );

};

export default injectContext(Layout);
