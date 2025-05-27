import React, { use, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/navbar-seller.css"

const NavbarSeller = () => {
	const { store, actions } = useContext(Context)
	return (
		<>

			<nav className="nav-seller-main navbar navbar-dark bg-dark navbar-expand-lg fixed-top ">
				<div className="nav-seller-container container-fluid d-flex justify-content-between align-items-center">
					{" "}
					{/* Flexbox en el container */}
					<Link className="nav-seller-brand navbar-brand d-flex align-items-center" to="/">
						<img src="/my-logo-fix.png" alt="Logo" />
					</Link>
					<butto n
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</butto>
					<div className="nav-seller-collapse collapse navbar-collapse" id="navbarNav">
						{/* Seria 1 <ul/> pero haremos 2  */}
						<ul
							className="navbar-nav mx-auto d-flex flex-column flex-lg-row align-items-lg-center"
							style={{ gap: "50px" }}
						>
							{" "}
							{/* Menú centrado */}
							<li className="nav-item">
								<Link className="nav-link" to="/seller/cars">
									AddCar
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/seller/cars/get">
									See Cars
								</Link>
							</li>
						</ul>
						<ul className="navbar-nav d-flex align-items-center">
							{" "}
							{/* Login a la derecha */}
							<li className="nav-item">
								{
									store.currentSeller ? (
										<button className="nav-btn" to="/" onClick={() => { actions.logOutSeller() }}>
											<i className="fa-solid fa-right-to-bracket nav-link"></i>
											<Link to="/" className="nav-link">LogOut</Link>
										</button>
									) :
										<button className="nav-btn" to="/">
											Login
										</button>

								}

							</li>
						</ul>
					</div>
				</div>
			</nav>


		</>
	);
};

export default NavbarSeller;