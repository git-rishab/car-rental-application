import React from 'react'
import styles from "../styles/carModal.module.css";
import styles2 from "../styles/card.module.css";
import { useDisclosure } from '@mantine/hooks';
import { Drawer } from '@mantine/core';
import { useSelector } from 'react-redux';
import { notification } from './notification';
import Payment from './Payment';

export default function CarModal(props) {
    const [opened, { open, close }] = useDisclosure(false);
    const { token } = useSelector((store)=>store.user);
    const handleRent = ()=>{
        if(token){
            open();
        } else {
            notification(null, 'Please Login First', 'white', '#F44336');
        }
    }
  return (
    <div className={styles.container}>
        <div>
            <div className={styles.background}>
                <img src={props.car.heroImg} alt="background" />
            </div>
            <div className={styles.pics}>
                {
                    props.car?.images.map((el,i)=>{
                        return i === 0 ? (<div key={i} className={styles.background2} style={{height: '110px'}}>
                        <img src={el} alt="car" />
                    </div>) : 
                         (<div key={i} >
                        <img src={el} alt="car" />
                    </div>)
                    })
                }
                
            </div>
        </div>

        <div className={styles.info}>
            <div>
                {props.car.title}
            </div>

            <div className={styles.desc}>
                {props.car.description}
            </div>

            <div className={styles.informations}>
                <div><p className={styles.properties}>Type Car <span className={styles.value}>{props.car.carType}</span></p></div>
                <div><p className={styles.properties}>Capacity<span className={styles.value}>{props.car.capacity} Person</span></p></div>
            </div>
            <div className={styles.informations}>
                <div><p className={styles.properties}>Transm. <span className={styles.value}>{props.car.transmission}</span></p></div>
                <div><p className={styles.properties}>Gasoline<span className={styles.value}>{props.car.fuelCapacity}L</span></p></div>
            </div>

            <div className={styles.rent}>
                <div><p className={styles2.price}>₹{props.car.rentPrice}.00/<span className={styles2.type}>days</span></p></div>
                <Drawer opened={opened} onClose={close}>
                    <Payment name={props.car.title} description={props.car.description} price = {props.car.rentPrice} id={props.car._id} />
                </Drawer>
                <div className={styles2.more} onClick={handleRent}>Rent Now</div>
            </div>

        </div>
    </div>
  )
}
