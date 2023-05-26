import React, { useState, useEffect } from 'react'
import { logo } from "../assets/asset";
import { useNavigate } from "react-router-dom";
import "../styles/nav-footer.css"
import { useDisclosure } from '@mantine/hooks';
import { Drawer } from '@mantine/core';
import LoginForm from './login/Login';
import Hamburger from 'hamburger-react'

export default function Navbar() {
  const url = "http://localhost:5000";
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [isOpen, setOpen] = useState(false);
  const [loggedIn,setLoggedIn] = useState('')
  
  useEffect(() => {
    let isMounted = true;
    const token = sessionStorage.getItem("token");
    const fetchData = async () => {
      try {
        const req = await fetch(`${url}/user/check`,{
          method:"GET",
          headers:{
            "authorization":token
          }
        });
        const res = await req.json();
        if(res.ok){
          setLoggedIn(res.profilePic)
        }
      } catch (error) {
        // Handle error here
        console.error(error);
      }
    };
  
    fetchData();
  
    return () => {
      isMounted = false;
    };
  }, []);

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

        {
          loggedIn ? (<div className='profile' onClick={()=>redirect('/dashboard')}><img src={loggedIn} alt="profilePic" /></div>) : (
            <>
            <div id='login' onClick={()=> {open(); setLogin(true)}} > Login </div>
            <div id='signup' onClick={()=> {open(); setLogin(false)}}> Signup </div>
            </>
          )
        }
      </div>

      <div className='ham'>
        <Hamburger toggled={isOpen} color='#3563E9' toggle={setOpen} onClick={()=> {open(); setLogin(true)}} />
      </div>
    </nav>
  )
}
