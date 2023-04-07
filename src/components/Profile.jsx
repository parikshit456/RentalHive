import React, { useEffect, useState } from 'react'
import profile from '../assets/svg/profile.svg'
import { getAuth } from "firebase/auth"
import { useNavigate } from 'react-router'
import Navbar from './Navbar'

const Profile = () => {
  const [user , setUser] = useState(null)
  const auth = getAuth()

  useEffect(() => {
    console.log(auth.currentUser);
    setUser(auth.currentUser)
  },[])

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
    <p>Hi username</p>
    <a href="/Pref">My Prefrence</a>
    <a href="#">My Notification</a>
    <a href="#">My Profile</a>
    <a href="#" style={{color: "red"}} onClick={onLogout}>Logout</a>
  </div>
</div>
  )
}

export default Profile