import React, { useState } from 'react';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Navbar from './pages/Navbar';
import Landing from './pages/Landing.js';
import Membership from './pages/Membership';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import ParticlesBg from './pages/Particles';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  const [landingVisible, setLandingVisible] = useState(true);
  const [contactUsVisible, setContactUsVisible] = useState(false);
  const [membershipVisible, setMembershipVisible] = useState(false);

  function toggleLanding() {
    setLandingVisible(true);
    setContactUsVisible(false);
    setMembershipVisible(false);
    setShowLogin(false);
    setShowSignup(false);
  }

  function toggleContactUs() {
    setLandingVisible(false);
    setContactUsVisible(true);
    setMembershipVisible(false);
    setShowLogin(false);
    setShowSignup(false);
  }

  function toggleMembership() {
    setLandingVisible(false);
    setContactUsVisible(false);
    setMembershipVisible(true);
    setShowLogin(false);
    setShowSignup(false);
  }

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  function handleLoginClick() {
    setShowLogin(true);
    setShowSignup(false);
    setLandingVisible(false);
    setContactUsVisible(false);
    setMembershipVisible(false);
  }

  function handleSignUpClick() {
    setShowSignup(true);
    setShowLogin(false);
    setLandingVisible(false);
    setContactUsVisible(false);
    setMembershipVisible(false);
  }

  return (
    <>
      <ApolloProvider client={client}>
        <div className="header" style={{ zIndex: 0, height: "100%", width: "350px", position: "absolute", opacity: 0.8 }}>
        </div>
        <h1 style={{ color: "black", marginBottom: 20, fontSize: 45, position: 'absolute', top: 25, left: 10 }}>
          Safe<span style={{ color: "#fff", textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000" }}>Zone</span>
        </h1>
        <div>
          <ParticlesBg color="#ff0000" num={200} type="random" bg={true} />
          <Navbar toggleLanding={toggleLanding} toggleContactUs={toggleContactUs} toggleMembership={toggleMembership} />
        </div>
        <div className={`Landing ${landingVisible ? "" : "hidden"}`}>
          <Landing />
        </div>
        <div className="buttons" style={{ position: "fixed", top: 0, right: 0 }}>
          <button style={{ color: "rgb(12, 123, 198)", backgroundColor: "white", fontWeight: 700 }} className="cool-button" onClick={handleLoginClick}>Login</button>
          <button style={{ backgroundColor: "rgb(12, 123, 198)", fontWeight: 500 }} className="cool-button" onClick={handleSignUpClick}>Sign Up</button>
        </div>
        <div className={`Login ${showLogin ? "" : "hidden"}`}>
          <Login />
        </div>
        <div className={`Signup ${showSignup ? "" : "hidden"}`}>
          <Signup />
        </div>
        <div className={`contactUs ${contactUsVisible ? "" : "hidden"}`}>
          <ContactUs />
        </div>
        <div className={`membership ${membershipVisible ? "" : "hidden"}`}>
          <Membership />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;