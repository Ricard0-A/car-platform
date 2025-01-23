import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/Home.jsx";
import Catalog from "./pages/Catalog.jsx";

import Register from "./pages/register.jsx";
import Login from "./pages/login.jsx";
import RegisterSellers from "./pages/registerSeller.jsx";
import LoginSellers from "./pages/loginSeller.jsx";
import AddCar from "./pages/seller-add.jsx";
import GetCar from "./pages/seller-get.jsx";
import injectContext from "./store/appContext";
import NavbarSeller from "./component/navbar-seller.jsx";
// import { Footer } from "./component/footer";

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
                <NavbarSeller />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Catalog />} path="/catalog" />
                        <Route element={<Register/>} path="/register"/>
                        <Route element={<Login/>} path="/login"/>
                        <Route element={<RegisterSellers/>} path="/register/sellers"/>
                        <Route element={<LoginSellers/>} path="/login/sellers"/>
                        
                        <Route element={<AddCar/>} path="/seller/cars"/>
                        <Route element={<GetCar/>} path="seller/cars/get"/>
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );

};

export default injectContext(Layout);
