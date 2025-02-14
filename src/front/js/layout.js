import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

// Mi codigo 
import Navbar from "../../front/js/component/Navbar.jsx"
import { Home } from "./pages/Home.jsx";
import Catalog from "./pages/Catalog.jsx";


import Register from "./pages/register.jsx";
import Login from "./pages/login.jsx";
import RegisterSellers from "./pages/registerSeller.jsx";
import SellYourCar from "./pages/SellYourCar.jsx"
import LoginSellers from "./pages/loginSeller.jsx";
import AddCar from "./pages/sellerAdd.jsx";
import GetCar from "./pages/sellerGet.jsx";
import injectContext from "./store/appContext";
import navbarSeller from "./component/navbarSeller.jsx";
import BecomeSeller from "./pages/becomeSeller.jsx";
import Footer from "./component/Footer.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import CarDetail from "./pages/CarDetail.jsx";
import CarDetailSeller from "./pages/CarDetailSeller.jsx";
import PayPal from "./pages/PayPal.jsx";
import EditContact from "./pages/editCar.jsx";
import Gallery from "./pages/Gallery.jsx";
import Reserve from "./pages/Reserve.jsx";

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
                        <Route element={<Login />} path="/login" />
                        <Route element={<Register />} path="/register" />
                        <Route element={<Gallery />} path="/gallery" />
                        <Route element={<CarDetail />} path="/car-detail/:idCar" />
                        <Route element={<Reserve />} path="/reserve" />


                        <Route element={<SellYourCar />} path="/sell-your-car" />
                        <Route element={<RegisterSellers />} path="/register/sellers" />
                        <Route element={<LoginSellers />} path="/login/sellers" />
                        <Route element={<AddCar />} path="/seller/cars" />
                        <Route element={<GetCar />} path="seller/cars/get" />
                        <Route element={<BecomeSeller />} path="/become/seller" />
                        <Route element={<CarDetailSeller />} path="/car/:idCar" />
                        <Route element={<EditContact />} path="/edit/car/:idCar" />
                        <Route element={<ContactUs />} path="/contact-us" />
                        <Route element={<PayPal />} path="/donation" />
                        <Route element={<h1 style={{ marginTop: "350px" }}>Not found!</h1>} path="*" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );

};

export default injectContext(Layout);
