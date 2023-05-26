import React from 'react'
import styles from "../styles/dashboard.module.css";
import { useEffect, useState } from 'react';

export default function Dashboard() {
    const url = 'http://localhost:5000'
    const [ data, setData] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
      
        const fetchData = async () => {
          setLoading(true);
          try {
            const req = await fetch(`${url}/user`,{
                method:"GET",
                headers:{
                    "authorization":sessionStorage.getItem("token")
                }
            });
            const res = await req.json();
            if (isMounted) {
              setLoading(false);
              console.log(res);
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
            <p></p>
            <div>
                <div><img src="" alt="" /></div>
                <div>Name</div>
                <div>Edit Profile</div>
            </div>
        </div>

        <p>Rented Cars</p>

        <div className=''>

        </div>
    </>
  )
}
