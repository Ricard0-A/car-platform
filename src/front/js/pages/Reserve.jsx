import React, { useState, useEffect } from "react";
import Select from "react-select";
import emailjs from "@emailjs/browser";
import "../../styles/reserve.css";

const Reserve = () => {
    const [dealerships, setDealerships] = useState([]);

    const [formValues, setFormValues] = useState({
        first_name: "",
        last_name: "",
        user_email: "",
        phone: "",
        message: "",
        selectedDealerships: []
    });

    useEffect(() => {
        fetch(`${process.env.BACKEND_URL}/sellers`)
            .then((res) => res.json())
            .then((data) => {
                const options = data.map((dealer) => ({
                    value: dealer.email,
                    label: dealer.name_representative
                }));
                setDealerships(options);
            })
            .catch((error) => {
                console.error("Error fetching dealerships:", error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (selectedOptions) => {
        setFormValues((prev) => ({
            ...prev,
            selectedDealerships: selectedOptions || []
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const user_name = `${formValues.first_name} ${formValues.last_name}`.trim();

        const toEmails = formValues.selectedDealerships
            .map((option) => option.value.trim())
            .join(",");

        if (!toEmails) {
            alert("Selecciona Un consesionario como minimo.");
            return;
        }

        const templateParams = {
            user_name,
            user_email: formValues.user_email,
            phone: formValues.phone,
            message: formValues.message,
            to_email: toEmails
        };

        emailjs
            .send(
                "service_10pv7pr",
                "template_80ehw99",
                templateParams,
                "TfD71rvJlWtTY883D"
            )
            .then(
                (result) => {
                    console.log("SUCCESS!", result.text);
                    setFormValues({
                        first_name: "",
                        last_name: "",
                        user_email: "",
                        phone: "",
                        message: "",
                        selectedDealerships: []
                    });
                },
                (error) => {
                    console.log("FAILED...", error.text);
                }
            );
    };

    return (
        <div className="container" style={{ marginTop: "100px" }}>
            <div className="row">
                <div className="col-12 col-md-6 descri-bg">
                    <h1>Choose a dealership and a sales advisor will contact you.</h1>
                </div>
                <div className="col-12 col-md-6 input-bg">
                    <form onSubmit={handleSubmit}>
                        <input
                            className="w-75"
                            type="text"
                            placeholder="First Name"
                            name="first_name"
                            value={formValues.first_name}
                            onChange={handleChange}
                        />
                        <input
                            className="w-75"
                            type="text"
                            placeholder="Last Name"
                            name="last_name"
                            value={formValues.last_name}
                            onChange={handleChange}
                        />
                        <input
                            className="w-75"
                            type="email"
                            placeholder="Email"
                            name="user_email"
                            value={formValues.user_email}
                            onChange={handleChange}
                        />
                        <input
                            className="w-75"
                            type="text"
                            placeholder="Number"
                            name="phone"
                            value={formValues.phone}
                            onChange={handleChange}
                        />
                        <label htmlFor="dealership">Select Dealership(s):</label>
                        <Select
                            isMulti
                            name="selectedDealerships"
                            options={dealerships}
                            value={formValues.selectedDealerships}
                            onChange={handleSelectChange}
                            placeholder="Select a Dealership..."
                            className="w-75"
                        />
                        <textarea
                            className="w-75"
                            name="message"
                            placeholder="Message"
                            value={formValues.message}
                            onChange={handleChange}
                        ></textarea>
                        <button type="submit" className="w-75 btn btn-success">
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Reserve;
