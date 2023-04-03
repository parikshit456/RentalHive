import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate()

  const onSignin = (() => {
      navigate("/Signin")
  })

  const onSignup = (() => {
      navigate("/Signup")
  })
  const onLogoClick = (() => {
    navigate("/")
})
  return (
    <div className="navbar">
    <div onClick={onLogoClick} className="navbar-logo">
      House<span>Hunter</span>
    </div>
    <div className="navbar-list">
      <div onClick={onSignin} className="signin-btn">Sign In</div>
      <div className="partition"></div>
      <div onClick={onSignup} className="signup-btn">Sign Up</div>
      <div className="download-btn">
        <button>Contact Us</button>
      </div>
    </div>
  </div>
  );
};

export default Navbar;
