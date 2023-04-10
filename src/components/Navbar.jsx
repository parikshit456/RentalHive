import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import Spinner from "./Spinner";
import { useAuthStatus } from "../hooks/useAuthStatus";

const Navbar = ({ authUser }) => {
  const [isActive, setIsActive] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const auth = getAuth();

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log(user)
        setUser(user)
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        setUser(null)
  
        // ...
      }
    });
  }, []);

  const onSignin = () => {
    if (isActive) {
      setIsActive(!isActive);
    }

    navigate("/Signin");
  };

  const onSignup = () => {
    if (isActive) {
      setIsActive(!isActive);
    }

    navigate("/Signup");
  };
  const onLogoClick = () => {
    if (isActive) {
      setIsActive(!isActive);
    }

    navigate("/");
  };

  const toggleMenu = () => {
    setIsActive(!isActive);
    console.log(auth);
  };


  return (
    <div className="navbar">
      <div onClick={onLogoClick} className="navbar-logo">
        House<span>Hunter</span>
      </div>

      {user ? (
        <div>
          <div className="btn-container">
            {/* <button className="navButton">Add Listing</button> */}
            <Profile user={user}/>
          </div>
        </div>
      ) : !user && (
       <div>
     <div className={isActive ? "navbar-list active" : "navbar-list"}>
            <div className="btn-container">
              <div onClick={onSignin} className="signin-btn">
                Sign In
              </div>
              <div onClick={onSignup} className="signup-btn">
                Sign Up
              </div>
            </div>
            <div className="download-btn">
              <button>Contact Us</button>
            </div>
          </div>

          <div className="navbar-toggle" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
