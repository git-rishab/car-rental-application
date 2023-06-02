import React, { useState, useEffect } from 'react'
import { logo } from "../assets/asset";
import { useNavigate } from "react-router-dom";
import "../styles/nav-footer.css"
import { useDisclosure } from '@mantine/hooks';
import { Drawer } from '@mantine/core';
import LoginForm from './login/Login';
import Hamburger from 'hamburger-react';
import { useSelector, useDispatch } from 'react-redux';
import { closeDrawer, openDrawer } from '../features/userSlice';


export default function Navbar() {
  const { profilePic, token } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [isOpen, setOpen] = useState(false);
  const [loggedIn,setLoggedIn] = useState('')
  const dispatch = useDispatch();
  const { isOpenn } = useSelector((store) => store.user);

  useEffect(() => {
    if(profilePic){
      setLoggedIn(profilePic)
    } else {
      setLoggedIn('')
    }
  }, [token]);

  useEffect(()=>{
    if(isOpenn){
      open()
    } else {
      close();
    }
  },[isOpenn])

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
        <Drawer opened={opened} onClose={()=>dispatch(closeDrawer())}>
          <LoginForm toggle1 = {login ? 'login' : 'register'} toggle2 = {login ? 'register' : 'login'} />
        </Drawer>

        {
          loggedIn ? (<div className='profile' onClick={()=>redirect('/dashboard')}><img src={loggedIn} alt="profilePic" /></div>) : (
            <>
            <div id='login' onClick={()=> {dispatch(openDrawer()); setLogin(true)}} > Login </div>
            <div id='signup' onClick={()=> {dispatch(openDrawer()); setLogin(false)}}> Signup </div>
            </>
          )
        }
      </div>

      <div className='ham'>
        <Hamburger toggled={isOpen} color='#3563E9' toggle={setOpen} onClick={()=> {dispatch(openDrawer()); setLogin(true)}} />
      </div>
    </nav>
  )
}
