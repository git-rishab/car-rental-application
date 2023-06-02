import React from "react";
import { DateTimePicker } from '@mantine/dates';
import { Select } from '@mantine/core';
import { pickMark, dropMark } from '../assets/asset'
import styles from "../styles/dashboard.module.css";
import styles2 from "../styles/payment.module.css";
import { url } from "./authorization";
import { useSelector } from "react-redux";
import { notification } from "./notification";

export default function Payment(props) {
  const { token } = useSelector((store)=>store.user);
  const handlePayment = async()=>{
    const req = await fetch(`${url}/car/payment`,{
      method:"POST",
      headers:{
        "content-type":"application/json",
        "authorization":token
      },
      body:JSON.stringify({
        name:props.name,
        description:props.description,
        price:props.price,
        day:"1",
        start:"",
        end:"",
        id:props.id
      })
    });
    const res = await req.json();
    if(res.ok){
      window.location.href = res.url;
    } else {
      notification(null, res.message, 'white', '#F44336');
    }
  }

  return (
    <section>
      <h1>Please Select Pick-Up and Drop-Off Timing and Location</h1>
      <div className={styles2.container}>
        <div className={styles2.pick}>
          <div className={styles2.img}>
            <img src={pickMark} alt="pick" />
            Pick-Up
          </div>

          <div className='pick-drop-inner'>
            <div>
              <Select
                className={styles.input}
                label="Location"
                placeholder="Select pick-up Loaction"
                // {...form.getInputProps('capacity')}
                // onChange={(value) => form.setFieldValue('capacity', value)}
                data={[
                  { value: 'Dhanbad', label: 'Dhanbad' },
                  { value: 'Ranchi', label: 'Ranchi' },
                  { value: 'Asansol', label: 'Asansol' },
                  { value: 'Kolkata', label: 'Kolkata' },
                  { value: 'Bokaro', label: 'Bokaro' },
                  { value: 'Delhi', label: 'Delhi' }
                ]}
                withAsterisk
              />
            </div>
            <div className='vertical-line'></div>
            <div>
              <DateTimePicker
                valueFormat="DD MMM YYYY hh:mm A"
                label="Pick date and time"
                placeholder="Pick date and time"
                maw={400}
                mx="auto"
                withAsterisk
              />
            </div>
          </div>
        </div>

        <div className={styles2.pick}>
          <div className={styles2.img}>
            <img src={dropMark} alt="drop" />
            Drop-Off
          </div>

          <div className='pick-drop-inner'>
            <div>
              <Select
                className={styles.input}
                label="Location"
                placeholder="Select pick-up Loaction"
                // {...form.getInputProps('capacity')}
                // onChange={(value) => form.setFieldValue('capacity', value)}
                data={[
                  { value: 'Dhanbad', label: 'Dhanbad' },
                  { value: 'Ranchi', label: 'Ranchi' },
                  { value: 'Asansol', label: 'Asansol' },
                  { value: 'Kolkata', label: 'Kolkata' },
                  { value: 'Bokaro', label: 'Bokaro' },
                  { value: 'Delhi', label: 'Delhi' }
                ]}
                withAsterisk
              />
            </div>
            <div className='vertical-line'></div>
            <div>
              <DateTimePicker
                valueFormat="DD MMM YYYY hh:mm A"
                label="Pick date and time"
                placeholder="Pick date and time"
                maw={400}
                mx="auto"
                withAsterisk
              />
            </div>
          </div>

        </div>
      </div>
      <div className={styles.more} onClick={handlePayment}>
        Pay Now
      </div>
    </section>
  )
};