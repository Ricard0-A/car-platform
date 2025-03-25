import React from "react";
import sellIt from "../../img/vende-auto.jpg";
import { Link } from "react-router-dom";

const SellYourCar = () => {

    const bgSteps = {
        marginTop: '62px',
        width: '900px',
        height: '334px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        boxShadow: "rgba(0, 0, 0, 0.4) 12px 10px 20px",
        borderRadius: '20px',
        color: 'white',
    }
    const ball = {
        height: "95px",
        borderRadius: "50%",
        background: "seagreen",
        width: "39%",
        paddingTop: "19px"
    }
    const powderBlue = {
        color: 'powderblue'
    }

    const powderBlueSans = {
        fontFamily: 'sans-serif',
        color: 'powderblue'
    }

    return (
        <>
            {/* Master Div */}
            <div className="position-relative text-white text-center" style={{
                marginTop: "55px",
                backgroundImage: `url(${sellIt})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "600px",
                boxShadow: '0px 0px 30px 10px rgba(0, 0, 0, 0.9)'
            }}>
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"></div>
                {/* Container*/}
                <div className="container position-relative h-100 d-flex align-items-center justify-content-center">
                    {/* Row */}
                    <div className="row w-100">
                        <div className="col-md-8 offset-md-2 fs-5 p-5 text-center bg-dark bg-opacity-75 rounded" style={{ boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)" }}>
                            <h1 className="fw-bold display-5" style={{ color: 'turquoise' }}>Reach More Buyers, Sell Faster!</h1>
                            <p className="lead">Join the Greatest platform for dealerships and increase your sales</p>
                            <div className="d-flex justify-content-around my-4">
                                <div className="text-center">
                                    <p><strong style={powderBlue}>Expand Your Reach</strong><br />Connect with thousands of potential buyers daily</p>
                                </div>
                                <div className="text-center">
                                    <p><strong style={powderBlue}>Hassle-Free Selling</strong><br />Simple listings and secure payment processing</p>
                                </div>
                                <div className="text-center">
                                    <p><strong className="fs-5" style={powderBlue}>Premium Dealer Perks</strong><br />Get featured and stand out from competitors</p>
                                </div>
                            </div>
                            <Link to="/become/seller" className="btn btn-success btn-lg">Start Selling Today</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Master Div 2 */}
            <div
                className="container-fluid d-flex justify-content-center"
                style={{ height: '29rem', backgroundColor: 'darkslategray' }}
            >
                <div className="row" >
                    {/* Div de instrucciones para el registro como seller */}
                    <div style={bgSteps}>
                        <div className="d-flex justify-content-center mt-5" style={{ height: '90%' }} >
                            <div className="col-4 text-center">
                                <div className="mx-auto" style={ball}>
                                    <h1>1</h1>
                                </div>
                                <p className="mt-5 fs-5" style={powderBlueSans}>
                                    Request an application by sending your email.
                                </p>
                            </div>

                            <div className="col-4 text-center">
                                <div className="mx-auto" style={ball}>
                                    <h1>2</h1>
                                </div>
                                <p className="mt-5 fs-5" style={powderBlueSans}>
                                    You will receive a response shortly.
                                </p>
                            </div>
                            <div className="col-4 text-center">
                                <div className="mx-auto" style={ball} >
                                    <h1>3</h1>
                                </div>
                                <p
                                    className="mt-5 fs-5 mx-auto"
                                    style={{ width: '78%', color: 'powderblue', fontFamily: 'sans-serif' }}
                                >
                                    Done! You can join us, complete you registration and start selling.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>

    );
};

export default SellYourCar;
