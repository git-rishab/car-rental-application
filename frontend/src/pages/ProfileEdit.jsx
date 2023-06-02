import React, { useEffect, useState } from 'react'
import { useForm } from '@mantine/form';
import { PasswordInput, TextInput, Button, Loader, Modal } from '@mantine/core';
import { useNavigate } from "react-router-dom";
import styles3 from '../styles/profileEdit.module.css';
import styles from '../styles/addcar.module.css';
import styles2 from '../styles/dashboard.module.css';
import { notification } from "../components/notification";
import { url } from '../components/authorization';
import { Upload } from 'tabler-icons-react';
import { widget } from '../components/widget';
import TwoFactor from '../components/TwoFactor';
import { useDisclosure } from '@mantine/hooks';
import { useSelector, useDispatch } from 'react-redux';
import { twoFactorAuth, request } from '../features/userSlice';
import Swal from 'sweetalert2';

export default function ProfileEdit() {
    const { token, unauthorized, twoFactor, name, address, profilePic } = useSelector((store)=>store.user);
    const navigate = useNavigate();
    // Redirect the user to other pages
    const redirect = (endpoint) => {
        navigate(endpoint)
    }
    const [loading, setLoading] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);
    const dispatch = useDispatch();

    const handleTwoFactor = async()=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to Disable 2FA?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0080FF',
            cancelButtonColor: '#F44336',
            confirmButtonText: 'Yes'
          }).then((result) => {
            if (result.isConfirmed) {
              disable();
            }
        })
        async function disable() {
            const req = await fetch(`${url}/otp/disable`,{
                method:"GET",
                headers:{
                    "content-type":"application/json",
                    "authorization":token
                }
            })
            const res = await req.json();
            if(res.ok){
                notification("Success!", res.message, 'white', '#F44336');
                dispatch(twoFactorAuth()); // changing the state
                redirect("/dashboard")
            } else {
                Swal.fire({
                    icon: 'error',
                    title: res.message,
                    text: '',
                })
            }
        }
    }

    // Check for authorization and some events on page load
    useEffect(() => {
        let isMounted = true;
        if (unauthorized) {
          redirect('/unauthenticated')
          return;
        }
        return () => {
            isMounted = false;
        };
    }, [token, unauthorized, twoFactor]);

    // Form inputs
    const form = useForm({
        initialValues: {
            name: name,
            address: address,
            password: '',
            confirmPassword: '',
        },

        // functions will be used to validate values at corresponding key
        validate: {
            name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
            address: (value) => (value.length < 5 ? 'Please enter valid Address' : null),
        },
    });

    // Handling the Edit Thing
    const handleSubmit = async() => {
        const profile =  JSON.parse(sessionStorage.getItem("images"));
        if((form.values.password && !form.values.confirmPassword) || (!form.values.password && form.values.confirmPassword)){
            Swal.fire({
                icon: 'error',
                title: "Fill all the fields",
                text: 'Please enter current and New Password',
            })
        } else if(form.values.password && form.values.confirmPassword){
            const data = {
                name:form.values.name,
                address:form.values.address,
                currentPassword:form.values.password,
                newPassword:form.values.confirmPassword
            }
            if(profile && profile.length){
                data.profilePic = profile[0];
            }
            const req = await fetch(`${url}/user/update/password`,{
                method:"PATCH",
                headers:{
                    "content-type":"application/json",
                    "authorization":token
                },
                body:JSON.stringify(data)
            })
            const res = await req.json();
            if(res.ok){
                notification("Success!", res.message, 'white', '#66BB6A');
                dispatch(request());
                redirect("/dashboard");
            } else {
                notification("Oops!", res.message, 'white', '#F44336');
            }
        } else {
            const data = {
                name:form.values.name,
                address:form.values.address,
            }
            if(profile && profile.length){
                data.profilePic = profile[0];
            }
            const req = await fetch(`${url}/user/update/details`,{
                method:"PATCH",
                headers:{
                    "content-type":"application/json",
                    "authorization":token
                },
                body:JSON.stringify(data)
            })
            const res = await req.json();
            if(res.ok){
                notification("Success!", res.message, 'white', '#66BB6A');
                dispatch(request());
                redirect("/dashboard");
            } else {
                notification("Oops!", res.message, 'white', '#F44336');
            }
        }
        setLoading(false);
    }

    return (
        <div className={styles3.container}>
            <p className={styles2.sub}>Please enter your profile info</p>
            <p className={styles.head}>USER INFO</p>
            <div>
                <form className={styles3.form} onSubmit={form.onSubmit(() => { setLoading(true); handleSubmit() })}>

                    <TextInput className={styles3.input} label="Name" placeholder="Your Title" {...form.getInputProps('name')} />

                    <TextInput className={styles3.input} label="Address" placeholder="Enter your Address" {...form.getInputProps('address')} />
                    <p className={styles2.sub}>Change Password</p>
                    <PasswordInput
                        className={styles3.input}
                        label="Current Password"
                        placeholder="Password"
                        {...form.getInputProps('password')}

                    />
                    <PasswordInput
                        className={styles3.input}
                        label="New password"
                        placeholder="Enter your New password"
                        {...form.getInputProps('confirmPassword')}
                    />

                    {
                        profilePic === 'https://cdn.filestackcontent.com/RuEgtpvGSbidugrFz91z' ? <div className={styles.upload} style={{marginTop:"20px"}} onClick={()=>widget(1)} >
                            <div>
                                <Upload size={50} strokeWidth={1.5} color={'#3563E9'} />
                                <p className={styles2.sub}>Click to upload Your Profile picture</p>
                            </div>
                        </div> : <p style={{ marginTop: '20px' }} className={styles2.no}>* You won't be able to Edit Profile picture as of Now *</p>

                    }
                    <div className={styles.submit}>
                        {
                            loading ? <Loader size="md" className={styles.loader} /> : (<>
                                <Button type="submit" className={styles.button} value='Edit'>Edit</Button>
                            </>)
                        }
                        {twoFactor ? <Button className={styles3.auth} onClick={handleTwoFactor} value='2FA'>Disable 2FA</Button> :<Button className={styles3.auth} onClick={open} value='2FA'>Setup 2FA</Button>}
                    </div>
                    <Modal opened={opened} onClose={close} size="auto" centered>
                        <TwoFactor />
                    </Modal>
                </form>
            </div>
        </div>
    )
}
