import React, { useRef, useEffect } from "react";
import "../../styles/paypal.css"

const PayPal = () => {
    const paypal = useRef()

    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: "Donación",
                            amount: {
                                currency_code: "BRL",
                                value: 1,
                            }
                        },
                    ]
                })
            },

            onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                console.log("Pago realizado")
                alert("Thank you for the donations")
            },
            onError: (err) => {
                console.log(err)
                alert("Something went wrong")
            }

        })
            .render(paypal.current)
    }, [])
    return (
        <>
            {/* <div className="row"> */}
            {/* <div className="col-12 col-md-6"> */}
            <div className="align-paypal-style ">
                <div className="first-style w-100 ">
                    <h1 className="d-flex justify-content-center first-title-style">Support DrivenS-Keep it Growing!</h1>
                    <p className="d-flex justify-content-center mt-3 first-text-style">Your donation will help us improve our platform
                        and provide the best service to dealership and customers</p>
                        {/* <p className="d-flex justify-content-center">DrivenS is dedicated to provide a good experience for car dealerships and buyers. Your support allows us to introduce new features,
                        maintain a high-quality platform, and keep improving services for all customers
                    </p> */}
                </div>
                <div className="make-contribution-style">
                    <h1 className="make-contribution-title">Make a difference with your contribution</h1>
                    <p>Securely donate via PayPal and be part of the DrivenS journey. Your support ensures
                        we can continue innovating and making a difference. Thank you for being a part of our mission!
                    </p>
                    <div className="paypal-style mt-5">
                    <h1 className="d-flex justify-content-center paypal-title-style">To donate</h1>
                    <div className="main-style" ref={paypal}></div>
                </div>
                </div>
               

            </div>
            <div className="text-center mb-4 mt-5">
                <h1 className="say-style">What our partners say</h1>
            </div>

            <div className="d-flex justify-content-center gap-3 mt-5">
                <div className="first-recomendation-style text-center">
                    <p className="p-5">
                        "DrivenS has helped us to make all decisions clear, streamlining our operations and improving efficiency. Their insights have been invaluable to our success."
                        <br/>
                        <br/>
                        <b className="asociation-style">— Steven Wilson | Dealership Owner</b>
                    </p>
                </div>
                <div className="text-center p-3 second-recomendation-style">
                    <p className="p-5">
                        "DrivenS has helped us to make all decisions clear and by providing valuable insights, we've been able to optimize our operations and drive growth."
                        <br/>
                        <br/>
                        <b className="asociation-style"> — Erika Grahan | Dealership Owner</b>
                    </p>
                </div>
            </div>

            {/* </div>
                </div> */}

        </>
    )

}

export default PayPal