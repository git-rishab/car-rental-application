import React from 'react'
import { logo } from "../assets/asset";
import { useNavigate } from "react-router-dom";
import "../styles/nav-footer.css"
import { useDisclosure } from '@mantine/hooks';
import { Drawer } from '@mantine/core';
import LoginForm from './login/Login';
import { useState } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const redirect = (endpoint) => {
    navigate(endpoint)
  }

  return (
    <nav>
      <div id='logo' onClick={() => redirect('/')}>
        <img src={logo} alt="Logo" />
      </div>

      <div id='nav-content'>
        
        <div onClick={() => redirect('/')}>Home</div>
        <div>About Us</div>

        {/* Login Popup */}
        <Drawer opened={opened} onClose={close}>
          <LoginForm toggle1 = {login ? 'login' : 'register'} toggle2 = {login ? 'register' : 'login'} />
        </Drawer>

        <div id='login' onClick={()=> {open(); setLogin(true)}} > Login </div>

        <div id='signup' onClick={()=> {open(); setLogin(false)}}> Signup </div>
      </div>
    </nav>
  )
}
