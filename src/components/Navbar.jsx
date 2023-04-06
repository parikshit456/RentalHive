import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

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
  };
  return (
    <div className="navbar">
      <div onClick={onLogoClick} className="navbar-logo">
        House<span>Hunter</span>
      </div>

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
      <div class="navbar-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Navbar;
