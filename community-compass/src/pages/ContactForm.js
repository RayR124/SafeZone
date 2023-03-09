import React, { useState } from "react";
import "./ContactForm.css";

const ContactForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formState),
    });
  
    const responseData = await response.json();
  
    if (response.ok) {
      setSuccessMessage("Thank you for your message! We will get back to you soon.");
    } else {
      console.error(responseData.error);
    }
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-form-container" style={{ float: "left", minWidth: 500 }}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Tell Us Your Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formState.name}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="email">Your Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formState.email}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="message">What would you like to say:</label>
        <textarea
          id="message"
          name="message"
          value={formState.message}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Send</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default ContactForm;