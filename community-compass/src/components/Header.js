import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="mb-4 py-3 flex-row align-center" >
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="" to="/">
          <h1 style={{ color: "black", fontSize: 50, left: 10, position: "absolute" }}>
          Safe<span style={{ color: "#fff", textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000" }}>Zone</span>
        </h1>
          </Link>
        </div>
        <div className="buttons" style={{ position: "absolute", top: 30, right: 10 }}>
          {Auth.loggedIn() ? (
            <>
              <Link className="cool-button" to="/contact">
                Contact Us
              </Link>
              <Link className="cool-button" to="/membership">
                Upgrage Membership
              </Link>
              <Link className="cool-button" to="/me">
                {Auth.getProfile().data.username}'s profile
              </Link>
              <button className="cool-button" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="cool-button" to="/login">
                Login
              </Link>
              <Link className="cool-button" to="/signup">
                Signup
              </Link>
              <Link className="cool-button" to="/Contact">
                Contact Us
              </Link>
              <Link className="cool-button" to="/">
                Home
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;