/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

function Navbar(props) {
    return (
        <nav className="links">
            <h1 style={{ fontSize: 30, marginBottom: 10, textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000" }}>
                <ul className="directory" style={{ marginTop: 10, display: "relative", flexDirection: "column", alignItems: "center" }}>
                    <li className="links">
                        <a href="#" onClick={props.toggleLanding} style={{ borderBottom: "1px solid #f2f2f2" }}>Home</a>
                    </li>

                    <li className="links">
                        <a href="#" onClick={props.toggleContactUs} style={{ borderBottom: "1px solid #f2f2f2" }}>Contact Us</a>
                    </li>

                    <li className="links">
                        <a href="#" onClick={props.toggleMembership} style={{ borderBottom: "1px solid #f2f2f2" }}>Membership</a>
                    </li>
                </ul>
            </h1>
        </nav>
    );
}

export default Navbar;