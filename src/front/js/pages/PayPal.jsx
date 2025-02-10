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
            <div className="container">
                <div className="row  d-flex justify-content-center">
                    <div className="col-12 col-md-6">
                        <div className="mt-5 pt-5">
                            <div className="first-style">
                                <h1 className="suport-style">Support DrivenS-Keep it Growing!</h1>
                                <p>Your donation will help us improve our platform and provide the best service to dealership and customers</p>
                            </div>
                            <div>
                                <p>DrivenS is dedicated to provide a good experience for car dealerships and buyers. Your support allows us to introduce new features,
                                    maintain a high-quality platform, and keep improving services for all customers
                                </p>
                            </div>
                            <div>
                                <h1>Make a difference with your contribution</h1>
                                <p>Securely donate via PayPal and be part of the DrivenS journey. Your support ensures
                                    we can continue innovating and making a difference. Thank you for being a part of our mission!
                                </p>
                            </div>
                            <h1 className="d-flex justify-content-center">To donate</h1>
                            <div ref={paypal}></div>
                        </div>
                        <div className="partner-style">
                            <h1>What or partners say</h1>
                            <div className="first-style">
                                <p>
                                    "DrivenS has helped us to make all decisions clear, streamlining our operations and improving efficiency. Their insights have been invaluable to our success."
                                    <b>— Steven Wilson | Dealership Owner</b>
                                </p>
                            </div>
                            <div>
                                <p>
                                    "DrivenS has helped us to make all decisions clear and by providing valuable insights, we've been able to optimize our operations and drive growth."
                                   <b> — Erika Grahan | Dealership Owner</b>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default PayPal