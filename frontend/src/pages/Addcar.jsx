import React, { useEffect, useState } from 'react';
import styles from '../styles/addcar.module.css';
import styles2 from '../styles/dashboard.module.css';
import { useForm } from '@mantine/form';
import { upperFirst } from '@mantine/hooks';
import { NumberInput, TextInput, Button, Select, Loader } from '@mantine/core';
import { useNavigate, useParams } from "react-router-dom";
import { Upload } from 'tabler-icons-react';
import { widget } from '../components/widget';
import { notification } from "../components/notification";
import { url } from '../components/authorization';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import { request } from '../features/userSlice';

export default function Addcar() {
    const { unauthorized, token } = useSelector((store)=>store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Redirect the user to other pages
    const redirect = (endpoint) => {
        navigate(endpoint)
    }
    const [loading, setLoading] = useState(false);
    const initialValues = {};
    const { action } = useParams();

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
    }, [unauthorized]);

    // Handling actions based on params 
    if (action === 'edit') {
        const car = JSON.parse(sessionStorage.getItem('car'));
        if (!car) {
            redirect('/unauthenticated');
            return;
        }
        initialValues.title = car.car.title;
        initialValues.carType = car.car.carType;
        initialValues.rentPrice = car.car.rentPrice;
        initialValues.capacity = car.car.capacity;
        initialValues.transmission = car.car.transmission;
        initialValues.location = car.car.location;
        initialValues.fuelCapacity = car.car.fuelCapacity;
        initialValues.description = car.car.description
    } else {
        initialValues.title = '';
        initialValues.carType = '';
        initialValues.rentPrice = '';
        initialValues.capacity = '';
        initialValues.transmission = '';
        initialValues.location = '';
        initialValues.fuelCapacity = '';
        initialValues.description = '';
    }

    // Form inputs
    const form = useForm({
        initialValues: initialValues,

        // functions will be used to validate values at corresponding key
        validate: {
            title: (value) => (value.length < 5 ? 'Title must have at least 5 letters' : null),
            carType: (value) => (!value ? 'Please select Brand' : null),
            rentPrice: (value) => (value < 200 ? 'Rent price could not be less than 200' : null),
            capacity: (value) => (!value ? 'Please select capacity in persons' : null),
            transmission: (value) => (!value ? 'Please select Car Type' : null),
            location: (value) => (value.length < 2 ? 'Please enter valid Location' : null),
            fuelCapacity: (value) => (value < 2 ? 'Please select Fuel Capacity' : null),
            description: (value) => (value.length < 20 ? 'Description must have at least 20 letters' : null)
        },
    });


    // Get current time in specified format related to MongoDB
    function getCurrentTime() {
        const date = new Date();
        const isoString = date.toISOString();
        const currentTime = isoString.slice(0, isoString.indexOf('Z')) + '+00:00';
        return currentTime;
    }

    // Handling form submission
    const handleSubmit = async () => {
        if (action == 'edit') {
            const car = JSON.parse(sessionStorage.getItem('car'));
            const req = await fetch(`${url}/car/edit?carId=${car.car._id}`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    "authorization": token
                },
                body: JSON.stringify(form.values)
            })
            const res = await req.json();
            setLoading(false);
            if (res.ok) {
                // sessionStorage.removeItem('car');
                notification('Edited successfully', res.message, 'white', '#12B886');
                dispatch(request()); // making the request to rerender on dashboard
                redirect('/dashboard');
            } else {
                notification('Oops!', res.message, 'white', '#F44336');
            }
            return;
        }

        const images = JSON.parse(sessionStorage.getItem('images'))
        if (!images) {
            notification('Please upload Images', 'You Need to upload atleast 1 image', 'white', '#EF5350');
            setLoading(false);
            return;
        }
        form.values.images = images;
        form.values.listedDate = getCurrentTime();

        const req = await fetch(`${url}/car/add`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "authorization": token
            },
            body: JSON.stringify(form.values)
        })
        const res = await req.json();
        setLoading(false);

        if (res.ok) {
            // sessionStorage.removeItem('images');
            notification('Added successfully', res.message, 'white', '#12B886');
            dispatch(request());
            redirect('/dashboard');
        } else {
            notification('Oops!', res.message, 'white', '#EF5350');
        }
    }

    // Handleing delete
    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert it!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0080FF',
            cancelButtonColor: '#F44336',
            confirmButtonText: 'Yes, Remove!'
        }).then((result) => {
            if (result.isConfirmed) {
                const car = JSON.parse(sessionStorage.getItem("car"));
                fetch(`${url}/car/delete?carId=${car.car._id}`,{
                    method:"DELETE",
                    headers:{
                        "authorization":token
                    }
                })
                
                notification('Car Removed Successfully', 'Your car has been removed!', 'white', '#F44336');
                dispatch(request());
                redirect('/dashboard');
            }
        })
    }
    return (
        <div className={styles.container}>
            <p className={styles2.subHead}>{upperFirst(action)} a Car for Rent</p>
            <p className={styles2.sub}>Please enter your car info</p>
            <p className={styles.head}>CAR INFO</p>
            <div>
                <form className={styles.form} onSubmit={form.onSubmit(() => { setLoading(true); handleSubmit() })}>
                    <div>
                        <TextInput className={styles.input} label="Car Title" placeholder="Your Title" {...form.getInputProps('title')} />
                        <Select
                            className={styles.input}
                            label="Car Type"
                            placeholder="Brand Name"
                            {...form.getInputProps('carType')}
                            // onChange={(value) => form.setFieldValue('carType', value)}
                            data={[
                                { value: 'Sport', label: 'Sport' },
                                { value: 'SUV', label: 'SUV' },
                                { value: 'MPV', label: 'MPV' },
                                { value: 'Sedan', label: 'Sedan' },
                                { value: 'Coupe', label: 'Coupe' },
                                { value: 'Hatchback', label: 'Hatchback' },
                            ]}
                        />
                    </div>
                    <div>
                        <NumberInput
                            className={styles.input}
                            label="Rent Price"
                            placeholder="Price in Rupees"
                            min={0}
                            max={100000}
                            {...form.getInputProps('rentPrice')}
                        />
                        <Select
                            className={styles.input}
                            label="Capacity"
                            placeholder="Capacity in persons"
                            {...form.getInputProps('capacity')}
                            // onChange={(value) => form.setFieldValue('capacity', value)}
                            data={[
                                { value: '2', label: '2' },
                                { value: '4', label: '4' },
                                { value: '6', label: '6' },
                                { value: '8 or more', label: '8 or more' }
                            ]}
                        />
                    </div>
                    <div>
                        <Select
                            className={styles.input}
                            label="Transmission"
                            placeholder="Car Type"
                            // onChange={(value) => form.setFieldValue('transmission', value)}
                            {...form.getInputProps('transmission')}
                            data={[
                                { value: 'Automatic', label: 'Automatic' },
                                { value: 'Manual', label: 'Manual' }
                            ]}
                        />
                        <TextInput className={styles.input} label="Location" placeholder="Enter your City" {...form.getInputProps('location')} />
                    </div>
                    <div>
                        <NumberInput
                            className={styles.input}
                            label="Fuel Capacity"
                            placeholder="Fuel Capacity in Liters"
                            min={0}
                            max={50}
                            {...form.getInputProps('fuelCapacity')}
                        />
                        <TextInput className={styles.input} label="Short Description" placeholder="Enter a short description" {...form.getInputProps('description')} />
                    </div>

                    {
                        action === 'add' ? <div className={styles.upload} onClick={()=>widget(3)} >
                            <div>
                                <Upload size={50} strokeWidth={1.5} color={'#3563E9'} />
                                <p className={styles2.sub}>Click to upload Images of Car</p>
                            </div>
                        </div> : <p style={{ marginTop: '20px' }} className={styles2.no}>* You won't be able to Edit images as of Now *</p>

                    }
                    <div className={styles.submit}>
                        {
                            loading ? <Loader size="md" className={styles.loader} /> : (<>
                                <Button type="submit" className={styles.button} value='Register'>
                                    {action === 'edit' ? 'Edit' : 'Submit'}</Button>
                                {action === 'edit' && <Button style={{ width: '70%', margin: 'auto', marginTop: '20px' }} className={styles2.del} onClick={handleDelete} value='Remove'>
                                    Remove</Button>}
                            </>)
                        }
                    </div>

                </form>

            </div>

        </div>
    )
}