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
                        <h1 className="d-flex justify-content-center">Para pagar</h1>
                        <div ref={paypal}></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default PayPal