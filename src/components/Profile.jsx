import React, { useEffect, useState } from 'react'
import profile from '../assets/svg/profile.svg'
import { getAuth } from "firebase/auth"
import { useNavigate } from 'react-router'
import Navbar from './Navbar'

const Profile = ({user}) => {
  // const [user , setUser] = useState(null)
  const [isActive, setIsActive] = useState(false);
  const auth = getAuth()
console.log(user)
  // useEffect(() => {
  //   console.log(auth.currentUser);
  //   setUser(auth.currentUser)
  // },[])

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const navigate = useNavigate ()

  const onLogout = () => {
    auth.signOut()
    navigate('/Signin')
  }
  
  return (
    <div className="dropdown1">
       <button class="dropbtn">
    <img src={profile}></img>
  </button>
  <div class="dropdown-content">
    <p>Hi {user.displayName}</p>
    <a href="/Pref">My Prefrence</a>
    <a href="#">My Notification</a>
    <a href="#">My Profile</a>
    <a href="#" style={{color: "red"}} onClick={onLogout}>Logout</a>
  </div>

</div>
  )
}

export default Profile