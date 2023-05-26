import React from 'react'
import styles from "../styles/dashboard.module.css";
import { useEffect, useState } from 'react';
import styles2 from "../styles/card.module.css";
import Card from "../components/Cards";
import { Loader } from '@mantine/core';

export default function Dashboard() {
  const url = 'http://localhost:5000'
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const req = await fetch(`${url}/user`, {
          method: "GET",
          headers: {
            "authorization": sessionStorage.getItem("token")
          }
        });
        const res = await req.json();
        if (isMounted) {
          setLoading(false);
          setData(res.data)
          console.log(res.data);
          //   setData(res.cars);
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
    <>
      <div className={styles.hero}>
        <p className={styles.subHead}>My Profile</p>
        <div className={styles.info}>
          <div>
            <div className={styles.profile}><img src={data.profilePic} alt="profilePic" /></div>
            <div>
              <div className={styles.subHead}>{data.name}</div>
              <div className={styles.sub}>{data.email}</div>
            </div>
          </div>
          <div className={styles2.more}>Edit Profile</div>
        </div>
      </div>

      <div className={styles.main}>
        <p>Rented Cars</p>
        <div className={styles.container}>
        {
            loading ? (<div className={styles.loader}>
              <Loader size="lg" />
              <p>Fetching Data...</p>
            </div>) : data?.rentedCars?.length ? (
              <div>
                {
                  data.rentedCars?.map((el, i) => {
                    return <Card key={i} car={el} rent={false} />
                  })
                }
              </div>
            ) : <div className={styles.no}>You haven't rented any cars yet</div>
          }
        </div>
      </div>

      <div className={styles.main}>
          <p>My Cars for Rent</p>
          <div className={styles.container}>
          {
            loading ? (<div className={styles.loader}>
              <Loader size="lg" />
              <p>Fetching Data...</p>
            </div>) : data?.listedCars?.length ? (
              <div>
                {
                  data.listedCars?.map((el, i) => {
                    return <Card key={i} car={el} />
                  })
                }
              </div>
            ) : <div className={styles.no}>You have not Listed any cars yet</div>
          }
          </div>
      </div>
    </>
  )
}
