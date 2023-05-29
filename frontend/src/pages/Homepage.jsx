import React from 'react'
import { hero1, hero2, search, pickMark, dropMark } from '../assets/asset'
import '../styles/homepage.css';
import Card from '../components/Cards';
import { useEffect, useState } from 'react';
import { Loader, Select } from '@mantine/core';
import styles from "../styles/dashboard.module.css";
import { url } from '../components/authorization';
import { DateTimePicker } from '@mantine/dates';
import { useSelector, useDispatch } from 'react-redux';

export default function Homepage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id:loggedIn } = useSelector((store)=>store.user);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const req = await fetch(`${url}/car`);
        const res = await req.json();
        if (isMounted) {
          setLoading(false);
          setCars(res.cars);
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

  return (
    <section id='homepage'>
      <div id='hero'>
        <div><img src={hero1} alt="Hero1" /></div>
        <div><img src={hero2} alt="Hero2" /></div>
      </div>

      <div id='pick-drop'>
        <div className='drop-pick'>
          <div>
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

        <div className='search'>
          <img src={search} alt="" />
        </div>

        <div className='drop-pick'>
          <div>
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

      <p className='sub-head'>Popular cars</p>


      {
        loading ?
          (<div className={styles.loader}>
            <Loader size="lg" />
            <p>Fetching the best available cars for you...</p>
          </div>)
          : (
            <div className='container'>
              {
                cars?.map((el, i) => {
                  return <Card key={i} car={el} rent={loggedIn === el.listedBy ? false : true} like={loggedIn === el.listedBy ? false : true} />
                })
              }
            </div>
          )
      }

    </section>
  )
}
