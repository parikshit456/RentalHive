import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import { getAuth } from "@firebase/auth";



const Navbar = ({authUser}) => {
  
  const [isActive, setIsActive] = useState(false);
  const [user , setUser] = useState(false)
  const navigate = useNavigate();


  const auth = getAuth()

  useEffect(() => {
    setUser(auth.currentUser)
    console.log(auth.currentUser)
    setUser(false)
  },[])


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
    console.log(auth)
  };
  
  return (
    <div className="navbar">
      <div onClick={onLogoClick} className="navbar-logo">
        House<span>Hunter</span>
      </div>

      {authUser.currentUser ? <div>
        <div className="btn-container">
          <Profile/>
        </div>
        
      </div> :
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
      }
      
    </div>
  );
};

export default Navbar;
