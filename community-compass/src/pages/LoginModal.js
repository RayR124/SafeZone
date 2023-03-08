import React, { useState } from "react";
import Login from './Login.js';

function LoginModal(props) {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  // function handleUsernameChange(event) {
  //   setUsername(event.target.value);
  // }

  // function handlePasswordChange(event) {
  //   setPassword(event.target.value);
  // }

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   // Here we add our login logic and then store the user data in the state or local storage
  // }

  return (
    <div className="login-modal" >
      <div className="modal-content">
        <Login />
      </div>
    </div>
  );
}

export default LoginModal;