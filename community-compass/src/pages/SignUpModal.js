import React, { useState } from "react";
import Signup from "./Signup";

function SignUpModal(props) {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [email, setEmail] = useState("");
//     const [isPremium, setIsPremium] = useState(false);

//     function handleUsernameChange(event) {
//         setUsername(event.target.value);
//     }

//     function handlePasswordChange(event) {
//         setPassword(event.target.value);
//     }

//     function handleEmailChange(event) {
//         setEmail(event.target.value);
//     }

//     function handleIsPremiumChange(event) {
//         setIsPremium(event.target.checked);
//     }

//     function handleSubmit(event) {
//         event.preventDefault();
//         // Here we add our signup logic and then store the user data in the state or local storage
//     }

    return (
        <div className="signUp-modal">
            <div style={{ backgroundColor: "rgb(12, 123, 198)" }} className="modal-content">
                <Signup />
            </div>
        </div>
    );
}

export default SignUpModal;