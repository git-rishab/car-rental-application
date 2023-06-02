import React, { useEffect, useState } from 'react'
import styles from "../styles/twoFactor.module.css";
import { useSelector } from 'react-redux';
import { PinInput, Button, Loader } from '@mantine/core';
import { url } from './authorization';
import { notification } from './notification';
import { useNavigate } from 'react-router-dom';
import { enable2FA } from '../features/userSlice';
import { useDispatch } from 'react-redux';

export default function TwoFactor(props) {
    const { token } = useSelector((store) => store.user);
    const [pin, setPin] = useState('');
    const [QR, setQR] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handlePinChange = (value) => {
        setPin(value);
    };

    const handleSubmit = async()=>{
        if(pin.length < 6){
            setError('Please enter correct OTP');
            return;
        }
        const req = await fetch(`${url}/otp/validate?otp=${pin}`,{
            method:"GET",
            headers:{
                "content-type":"application/json",
                "authorization":token
            }
        });
        const res = await req.json();
        if(res.ok){
            notification('Success!', res.message, 'white', '#66BB6A');
            dispatch(enable2FA());
            navigate("/dashboard");
        } else {
            setError(res.message);
        }
    }

    useEffect(()=>{
        async function fetchData() {
            const req = await fetch(`${url}/otp/generate`,{
                method:"GET",
                headers:{
                    "content-type":"application/json",
                    "authorization":token
                }
            });
            const res = await req.json();
            if(res.ok){
                setQR([res.QR,res.secret])
            } else {
                notification(null, 'something went wrong', 'white', '#F44336');
            }
        }
        fetchData();
    },[token])

    return (
        <div>
            <h3 className={styles.heading3}>Two-Factor Authentication (2FA)</h3>
            <div>
                <h4 className={styles.heading4}>
                    Configuring Google Authenticator or Authy
                </h4>
                <div className={styles.orderedList}>
                    <li>
                        Install Google Authenticator (IOS - Android) or Authy (IOS -
                        Android).
                    </li>
                    <li>In the authenticator app, select "+" icon.</li>
                    <li>
                        Select "Scan a barcode (or QR code)" and use the phone's camera
                        to scan this barcode.
                    </li>
                </div>
                <div>
                    <h4 className={styles.heading4}>Scan QR Code</h4>
                    <div className="flex justify-center">
                        {QR.length ? <img
                            src={QR[0]}
                            className="block w-64 h-64 object-contain"
                            alt="qrcode url"
                        />: <Loader size='sm'/>}
                    </div>
                </div>
                <div>
                    <h4 className={styles.heading4}>Or Enter Code Into Your App</h4>
                    <p className="text-sm">SecretKey: {QR.length ? QR[1] : <Loader size='sm'/>} (Base32 encoded)</p>
                </div>
                <div>
                    <h4 className={styles.heading4}>Verify Code</h4>
                    <p style={{marginBottom:"10px"}}>Enter the code you see on your Authenticator</p>
                </div>
                <form>
                    <PinInput length={6} value={pin} onChange={handlePinChange} />
                    {error && <p className={styles.error}>
                        {error}
                    </p>}

                    <Button style={{marginTop:"10px"}} onClick={handleSubmit}>
                        Verify & Activate
                    </Button>
                </form>
            </div>
        </div>


    )
}
