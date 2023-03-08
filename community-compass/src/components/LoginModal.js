import React, { useState } from "react";

function LoginModal(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Here we add our login logic and then store the user data in the state or local storage
  }

  return (
    <div className="login-modal">
      <div style={{ backgroundColor: "rgb(12, 123, 198)" }} className="modal-content">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <label>
            Username:
            <input type="text" value={username} onChange={handleUsernameChange} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={handlePasswordChange} />
          </label>
          <br />
          <button type="submit">Submit</button>
          <button type="button" onClick={props.onClose}>Close</button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;