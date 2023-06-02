import React, { useState } from 'react'
import { gas, transmission, like, unlike, users } from '../assets/asset';
import styles from "../styles/card.module.css";
import { useDisclosure, useToggle } from '@mantine/hooks';
import { Modal, Loader } from '@mantine/core';
import CarModal from './CarModal';
import { notification } from './notification';
import { useNavigate } from "react-router-dom";
import { url } from './authorization';
import { useSelector, useDispatch } from 'react-redux';
import { request } from '../features/userSlice';

export default function Cards(props) {
  const { token } = useSelector((store)=>store.user);
  const [opened, { open, close }] = useDisclosure(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if(props.isLiked){
    var [Like, toggle] = useToggle([true, false]);
  } else {
    var [Like, toggle] = useToggle([false, true]);
  }

  const redirect = (endpoint) => {
    navigate(endpoint)
  }

  const handleLike = async () => {
    // const token = sessionStorage.getItem("token");
    if (!token) {
      notification(null, 'Please Login First', 'white', '#F44336');
      return;
    }
    setLoader(true);
    if (Like) {
      const req = await fetch(`${url}/user/wishlist/remove?carId=${props.car._id}`,{
        method:"PATCH",
        headers:{
          "authorization":token
        }
      });
      const res = await req.json();

      if (res.ok) {
        notification('Voilla!!', res.message, 'white', '#3563E9');
        dispatch(request());
        toggle();
      } else {
        notification('Oops!', res.message, 'white', '#F44336');
      }
    } else {
      const req = await fetch(`${url}/user/wishlist/add?carId=${props.car._id}`,{
        method:"PATCH",
        headers:{
          "authorization":token
        }
      });
      const res = await req.json();
      if (res.ok) {
        notification('Voilla!!', res.message, 'white', '#3563E9');
        dispatch(request());
        toggle();
      } else {
        notification('Oops!', res.message, 'white', '#F44336'); // red
      }
    }
    setLoader(false);
  }

  return (
    <div className={styles.card}>
      <div>
        <div className={styles.title}>{props.car.title}</div>
        {props.like ? loader ? <Loader size="sm" /> : (<img className={styles.like} onClick={handleLike} src={Like ? like : unlike} alt="wishlist" />) : ""}
      </div>

      <p className={styles.type}>{props.car.carType}</p>

      <div className={styles.image}><img src={props.car.heroImg} alt="image" /></div>

      <div className={styles.carInfo}>
        <div className={styles.info}><img src={gas} alt="fuel" /> <span>{props.car.fuelCapacity}L</span></div>
        <div className={styles.info}><img src={transmission} alt="transmission" /> <span>{props.car.transmission}</span></div>
        <div className={styles.info}><img src={users} alt="peoples" /> <span>{props.car.capacity} People</span></div>
      </div>

      <div>
        <div className={styles.price}>₹{props.car.rentPrice}.00/ <span className={styles.type}>day</span></div>
        {
          props.rent ? (<div className={styles.more} onClick={open}>More info</div>) : (<div className={styles.more} onClick={()=>{ sessionStorage.setItem('car',JSON.stringify(props)) ;redirect('/car/edit')}}>Edit</div>)
        }
        <Modal opened={opened} onClose={close} size="auto" centered>
          <CarModal car={props.car} />
        </Modal>
      </div>

    </div>
  )
}
