import React from 'react'
import profile from '../assets/svg/profile.svg'

const Profile = () => {
  return (
    <div className="dropdown1">
  <button class="dropbtn">
    <img src={profile}></img>
  </button>
  <div class="dropdown-content">
    <p>Hi username</p>
    <a href="/Pref">My Prefrence</a>
    <a href="#">My Notification</a>
    <a href="#">My Profile</a>
    <a href="#" style={{color: "red"}}>Logout</a>
  </div>
</div>
  )
}

export default Profile