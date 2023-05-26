import React from 'react'
import styles from "../styles/carModal.module.css";
import styles2 from "../styles/card.module.css";
import { useDisclosure } from '@mantine/hooks';
import { Drawer } from '@mantine/core';

export default function CarModal(props) {
    const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className={styles.container}>
        <div>
            <div className={styles.background}>
                <img src={props.car.heroImg} alt="background" />
            </div>
            <div className={styles.pics}>
                <div className={styles.background2} style={{height: '110px'}}>
                    <img src={props.car.heroImg} alt="car" />
                </div>
                <div>
                    <img src={props.car.images[0]} alt="view1" />
                </div>
                <div>
                    <img src={props.car.images[1]} alt="view2" />
                </div>
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
                    <div>Hi</div>
                </Drawer>
                <div className={styles2.more} onClick={open}>Rent Now</div>
            </div>

        </div>
    </div>
  )
}
