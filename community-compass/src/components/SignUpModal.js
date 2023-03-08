import React, { useState } from "react";

function SignUpModal(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isPremium, setIsPremium] = useState(false);

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handleIsPremiumChange(event) {
        setIsPremium(event.target.checked);
    }

    function handleSubmit(event) {
        event.preventDefault();
        // Here we add our signup logic and then store the user data in the state or local storage
    }

    return (
        <div className="signUp-modal">
            <div className="modal-content">
                <form onSubmit={handleSubmit}>
                    <h2>Sign Up</h2>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={handleUsernameChange} />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input type="email" value={email} onChange={handleEmailChange} />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input type="password" value={password} onChange={handlePasswordChange} />
                    </label>
                    <br />
                    <label>
                        <input type="checkbox" checked={isPremium} onChange={handleIsPremiumChange} />
                        <span> </span>Check to sign up for premium account for <br></br>$10/month.
                    </label>
                    <br />
                    <button type="submit">Sign Up</button>
                    <button type="button" onClick={props.onClose}>Close</button>
                </form>
            </div>
        </div>
    );
}

export default SignUpModal;