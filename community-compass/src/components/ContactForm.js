import React, { useState } from "react";

function ContactForm() {
  const [feedback, setFeedback] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setFeedback("");
  }

  function handleChange(event) {
    setFeedback(event.target.value);
  }

  return (
    <div className="">
    <form onSubmit={handleSubmit}>
      <label htmlFor="feedback" style={{ fontSize: "larger", fontWeight: "600" }}>Leave us some Feedback:</label>
      <br />
      <textarea id="feedback" name="feedback" rows="5" cols="30" value={feedback} onChange={handleChange} />
      <br />
      <button className="cool-button" type="submit">Submit</button>
    </form>
    </div>
  );
}

export default ContactForm;