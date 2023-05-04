import React, { useEffect, useState } from "react";
import profile from "../assets/svg/profile.svg";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router";
import Navbar from "./Navbar";

const Profile = ({ user }) => {

  const auth = getAuth();


  const navigate = useNavigate();

  const onLogout = () => {
    auth.signOut();
    navigate("/Signin");
  };

  return (
    <div className="dropdown1">
      <img src={user.photoURL} className="dropbtn-logo"></img>
      <div class="dropdown-content">
        <p>Hi {user.displayName}</p>
        <a href="/Pref">My Prefrence</a>
        <a href="/Noti">My Notification</a>
        <a href="/MyProfile">My Profile</a>
        <a href="" style={{ color: "red" }} onClick={onLogout}>
          Logout
        </a>
      </div>
    </div>
  );
};

export default Profile;
