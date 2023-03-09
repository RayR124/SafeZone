import React, { useState } from 'react';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import Navbar from './pages/Navbar';
import Landing from './pages/Landing.js';
import Membership from './pages/Membership';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import ParticlesBg from './pages/Particles';
import Auth from '../src/utils/auth';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter } from 'react-router-dom';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  uri: '/graphql',
});

function App() {
  const [landingVisible, setLandingVisible] = useState(true);
  const [contactUsVisible, setContactUsVisible] = useState(false);
  const [membershipVisible, setMembershipVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const logout = (event) => {
    event.preventDefault();
    setIsLoggedIn(false);
    Auth.logout();
  };

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

  function toggleLogin() {
    setShowLogin(true);
    setShowSignup(false);
    setLandingVisible(false);
    setContactUsVisible(false);
    setMembershipVisible(false);
  }

  function toggleSignup() {
    setShowSignup(true);
    setShowLogin(false);
    setLandingVisible(false);
    setContactUsVisible(false);
    setMembershipVisible(false);
  }


  return (
    <>
      <ApolloProvider client={client}>
        <BrowserRouter>
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
          {!isLoggedIn ? (
            <div className="buttons" style={{ position: "fixed", top: 0, right: 0 }}>
              <button style={{ backgroundColor: "rgb(12, 123, 198)", fontWeight: 500 }} className="cool-button" onClick={toggleSignup}>Signup</button>
              <button style={{ color: "rgb(12, 123, 198)", backgroundColor: "white", fontWeight: 700 }} className="cool-button" onClick={toggleLogin}>Login</button>
            </div>
          ) : (
            <div style={{ position: "absolute", top: 0, right: 0 }}>
              {isLoggedIn && (
                <button style={{ color: "rgb(12, 123, 198)", backgroundColor: "white", fontWeight: 700 }} className="cool-button" onClick={logout}>Logout</button>
              )}
            </div>
          )}
          <div className="buttons" style={{ position: "absolute", top: 30, right: 10 }}>
            {Auth.loggedIn() ? (
              <>
                <p>{Auth.getProfile().data.username} is currently logged In</p>
              </>) : (<><p>You are not logged In</p></>
            )}
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
        </BrowserRouter>
      </ApolloProvider>
    </>
  );
}

export default App;