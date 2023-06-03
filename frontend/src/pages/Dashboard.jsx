import React from 'react'
import styles from "../styles/dashboard.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import styles2 from "../styles/card.module.css";
import Card from "../components/Cards";
import { Loader } from '@mantine/core';
import Swal from 'sweetalert2';
import { notification } from '../components/notification';
import { url } from '../components/authorization';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, logOut } from '../features/userSlice';
import { useParams } from 'react-router-dom';

export default function Dashboard() {
  var { token, email, address, name, wishlist, listedCars, rentedCars, unauthorized, profilePic, request } = useSelector((store) => store.user);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const redirect = (endpoint) => {
    navigate(endpoint)
  }

  // Calling APIs and Checking for authorization
  useEffect(() => {
    let isMounted = true;
    // console.log(unauthorized);
    if (unauthorized) {
      console.log('dashboard', unauthorized);
      redirect('/unauthenticated')
      return;
    }
    const urlParams = new URLSearchParams(location.search);
    const events = urlParams.get("events");
    // Notification for payment things
    if(events == "paymentfailure"){
      notification('Payment Cancelled', 'No money was Deducted', 'white', '#F44336');
    } else if(events == "paymentsuccess"){
      notification('Payment Successfull', 'Thank You for choosing Drive Away', 'white', '#66BB6A');
      const start = urlParams.get('start');
      const end = urlParams.get('end');
      const id = urlParams.get('id'); 
      fetch(`${url}/car/rent`,{
        method:"PATCH",
        headers:{
          "content-type":"application/json",
          "authorization":token
        },
        body:JSON.stringify({carId:id})
      }).then((raw)=>raw.json()).then((res)=>request=false);
    }


    setLoading(true);
    if (!request) {
      dispatch(getUser('/user'));
    }
    sessionStorage.removeItem('images');
    sessionStorage.removeItem('car');
    if (isMounted) {
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [request, unauthorized, token]);

  const handleLogOut = async () => {
    const req = await fetch(`${url}/user/logout`, {
      headers: {
        "authorization": token
      }
    })
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to Log out?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0080FF',
      cancelButtonColor: '#F44336',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        notification('Logged out Successfully', 'See you soon!', 'white', '#F44336');
        sessionStorage.clear();
        dispatch(logOut());
        redirect('/');
      }
    })

  }

  return (
    <>
      <div className={styles.hero}>
        <p className={styles.subHead}>My Profile</p>
        <div className={styles.info}>
          {
            loading ? <Loader size='lg' /> : (
              <>
                <div>
                  <div className={styles.profile}><img src={profilePic} alt="profilePic" /></div>
                  <div>
                    <div className={styles.subHead}>{name}</div>
                    <div className={styles.sub}>{email}</div>
                  </div>
                </div>
                <div>
                  <div className={styles2.more} onClick={() => redirect('/profile/edit')}>Edit Profile</div>
                  <div className={styles.del} onClick={handleLogOut}>Log out</div>
                </div>
              </>
            )
          }
        </div>
      </div>

      <div className={styles.main}>
        <p>Favourites</p>
        <div className={styles.container}>
          {
            loading ? (<div className={styles.loader}>
              <Loader size="lg" />
              <p>Fetching Data...</p>
            </div>) : wishlist?.length ? (
              <>
                {
                  wishlist?.map((el, i) => {
                    return <Card key={i} car={el} rent={true} like={true} isLiked={true} />
                  })
                }
              </>
            ) : <div className={styles.no}>You doesn't have any Favroites right now</div>
          }
        </div>
      </div>

      <div className={styles.main}>
        <p>Rented Cars</p>
        <div className={styles.container}>
          {
            loading ? (<div className={styles.loader}>
              <Loader size="lg" />
              <p>Fetching Data...</p>
            </div>) : rentedCars?.length ? (
              <>
                {
                  rentedCars?.map((el, i) => {
                    return <Card key={i} car={el} rent={false} />
                  })
                }
              </>
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
            </div>) : listedCars?.length ? (
              <>
                {
                  listedCars?.map((el, i) => {
                    return <Card key={i} car={el} />
                  })
                }
              </>
            ) : <div className={styles.no}>You have not Listed any cars yet</div>
          }
        </div>
      </div>

      <div className={styles.more} onClick={() => { redirect('/car/add'); }}>Add Cars for Rent</div>
    </>
  )
}
