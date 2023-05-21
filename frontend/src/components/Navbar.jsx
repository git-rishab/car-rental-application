import React from 'react'
import { logo } from "../assets/asset";
import { useNavigate } from "react-router-dom";
import "../styles/homepage.css"

export default function Navbar() {
  const navigate = useNavigate();

  const redirect = ()=>{
    navigate('/')
  }

  return (
    <nav>
      <div id='logo'>
        <img src={logo} alt="Logo" />
      </div>
      <div id='nav-content'>
        <div onClick={ redirect }>Home</div>
        <div>About Us</div>
        <div id='login'> Login </div>
        <div id='signup'> Signup </div>
      </div>
    </nav>
  )
}
