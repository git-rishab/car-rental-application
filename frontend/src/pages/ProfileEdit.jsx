import React, { useEffect, useState } from 'react'
import { useForm } from '@mantine/form';
import { PasswordInput, TextInput, Button, Loader } from '@mantine/core';
import { useNavigate } from "react-router-dom";
import styles3 from '../styles/profileEdit.module.css';
import styles from '../styles/addcar.module.css';
import styles2 from '../styles/dashboard.module.css';
import { notification } from "../components/notification";
import { url } from '../components/authorization';
import { Upload } from 'tabler-icons-react';
import { widget } from '../components/widget';

export default function ProfileEdit() {
    const navigate = useNavigate();
    // Redirect the user to other pages
    const redirect = (endpoint) => {
        navigate(endpoint)
    }
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});

    // Check for authorization and some events on page load
    useEffect(() => {
        let isMounted = true;
        const check = async () => {
            try {
                const req = await fetch(`${url}/user`, {
                    method: "GET",
                    headers: {
                        "authorization": sessionStorage.getItem("token")
                    }
                });
                const res = await req.json();
                if (!res.ok) {
                    sessionStorage.clear();
                    redirect('/unauthenticated');
                } else {
                    setUser(res.data)
                }

            } catch (error) {
                console.error(error);
            }
        }
        check();

        return () => {
            isMounted = false;
        };
    }, []);

    // Form inputs
    const form = useForm({
        initialValues: {
            name:user.name,
            address:user.address,
            password: '',
            confirmPassword: '',
        },

        // functions will be used to validate values at corresponding key
        validate: {
            password: (value)=> (value.length ? 'Current Password is compulsory to make changes' : null),
            name: (value) => (value.length < 5 ? 'Name must have at least 2 letters' : null),
            address: (value) => (value.length < 5 ? 'Please enter valid Address' : null),
        },
    });

    const handleSubmit = ()=>{
        console.log(form.values);
    }

    return (
        <div className={styles3.container}>
            <p className={styles2.sub}>Please enter your profile info</p>
            <p className={styles.head}>USER INFO</p>
            <div>
                <form className={styles3.form} onSubmit={form.onSubmit(() => { setLoading(true); handleSubmit() })}>

                    <TextInput className={styles3.input} label="Name" placeholder="Your Title" {...form.getInputProps('name')} />

                    <TextInput className={styles3.input} label="Address" placeholder="Enter your Address" {...form.getInputProps('address')} />

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
                        user.profilePic === 'https://cdn.filestackcontent.com/RuEgtpvGSbidugrFz91z' ? <div className={styles.upload} onClick={widget} >
                            <div>
                                <Upload size={50} strokeWidth={1.5} color={'#3563E9'} />
                                <p className={styles2.sub}>Click to upload Images of Car</p>
                            </div>
                        </div> : <p style={{ marginTop: '20px' }} className={styles2.no}>* You won't be able to Edit images as of Now *</p>

                    }
                    <div className={styles.submit}>
                        {
                            loading ? <Loader size="md" className={styles.loader} /> : (<>
                                <Button type="submit" className={styles.button} value='Edit'>Edit</Button>
                            </>)
                        }
                    </div>

                </form>
            </div>
        </div>
    )
}
