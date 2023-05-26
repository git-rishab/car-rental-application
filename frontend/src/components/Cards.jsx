import React from 'react'
import { car, gas, transmission, like, unlike, users } from '../assets/asset';
import styles from "../styles/card.module.css";
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import CarModal from './CarModal';

export default function Cards(props) {
  const [opened, { open, close }] = useDisclosure(false);
  
  return (
    <div className={styles.card}>

      <div>
        <div className={styles.title}>{props.car.title}</div>
        <img src={unlike} alt="" />
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
        <div className={styles.more} onClick={open}>More info</div>
        <Modal opened={opened} onClose={close} size="auto" centered>
          <CarModal car={props.car} />
        </Modal>
      </div>
      
    </div>
  )
}
