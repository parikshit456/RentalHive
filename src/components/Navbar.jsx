import React from "react";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        House<span>Hunter</span>
      </div>
      <div className="navbar-list">
        <div className="signin-btn">Sign In</div>
        <div className="partition"></div>
        <div className="signup-btn">Sign Up</div>
        <div className="download-btn">
          <button>Download App</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
