import React from "react";
import ContactForm from "./ContactForm";

const contactUs = () => {

    return (
        <div className="contactUs" style={{ marginLeft: 360, marginRight: 25 }}>
            <h1 style={{ color: "gray", fontSize: 45, marginBottom: 15, textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000" }}>
                Contact Us:
            </h1>
            <div className="form">
                <ContactForm />
            </div>
        </div>

    );
}

export default contactUs;