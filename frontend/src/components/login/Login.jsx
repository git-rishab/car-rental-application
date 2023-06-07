import React, { useRef, useState } from 'react'
import { useToggle, upperFirst, useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  LoadingOverlay,
  Modal,
  PinInput
} from '@mantine/core';
import styles from '../../styles/login.module.css';
import { google } from '../../assets/asset';
import ReCAPTCHA from "react-google-recaptcha";
import Swal from 'sweetalert2';
import { url } from '../authorization';
import { useDispatch } from 'react-redux';
import { login, closeDrawer } from '../../features/userSlice';
import { useNavigate } from 'react-router-dom';
import { notification } from '../notification';



export default function AuthenticationForm(props) {
  const [type, toggle] = useToggle([props.toggle1, props.toggle2]);
  const captchaRef = useRef(null);
  const [capthca, setCaptcha] = useState(false);
  const [visible, toggleDisclosure] = useToggle([false, true]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [pin, setPin] = useState('');

  const redirect = (endpoint) => {
    navigate(endpoint)
  }
  const handlePinChange = (value) => {
    setPin(value);
  };

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      address: '',
      recaptcha: '',
      terms: true,
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length < 3 ? 'Password should include at least 3 characters' : null),
    },
  });

  const handleSubmitOTP = async () => {
    const id = sessionStorage.getItem("id");
    const req = await fetch(`${url}/otp/verify?id=${id}&token=${pin}`);
    const res = await req.json();
    if (res.ok) {
      dispatch(login({ token: res.token, profilePic: res.profilePic, id: res.id, twoFA:true }));
      dispatch(closeDrawer());
      // sessionStorage.setItem('token', res.token);
      notification('Login Successfull', 'Welcome to Drive Away', 'white', '#66BB6A');
      sessionStorage.removeItem("id");
      redirect('/dashboard');
    } else {
      Swal.fire({
        icon: 'error',
        title: res.message,
        text: '',
      })
    }
  }

  const handleSubmit = async () => {
    const token = captchaRef?.current?.getValue();
    if (!token && type == 'register') {
      // reCAPTCHA is not completed, handle the error or show a message
      setCaptcha(true);
      toggleDisclosure();
      return;
    }
    setCaptcha(false);
    captchaRef?.current?.reset();

    if (type === 'login') {
      const req = await fetch(`${url}/user/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ email: form.values.email, pass: form.values.password })
      })
      const res = await req.json();
      if (res.ok) {
        dispatch(login({ token: res.token, profilePic: res.profilePic, id: res.id, twoFA:false }));
        dispatch(closeDrawer());
        // sessionStorage.setItem('token', res.token);
        notification('Login Successfull', 'Welcome to Drive Away', 'white', '#66BB6A');
        redirect('/dashboard');
      } else if (res.twoFA) {
        open();
        sessionStorage.setItem('id', res.id);
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message,
          text: '',
        })
      }

    } else {
      const req = await fetch(`${url}/user/register`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          email: form.values.email,
          pass: form.values.password,
          name: form.values.name,
          address: form.values.address,
          captcha: token,
        })
      })

      const res = await req.json();

      if (res.ok) {
        Swal.fire(
          '',
          res.message,
          'success'
        )
        toggle();
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message,
          text: '',
        })
      }
    }
    toggleDisclosure();
  }
  return (
    <Paper radius="md" p="xl" {...props} className={styles.container}>
      <Modal opened={opened} onClose={close} size="auto" centered>
        <div className={styles.otp}>
          <div><h3>Please Enter OTP from Authenticator to continue</h3></div>
          <div><PinInput length={6} style={{margin:"auto"}} value={pin} onChange={handlePinChange} /></div>
          <div><Button style={{ margin: "auto", marginTop: "10px" }} onClick={handleSubmitOTP}>
            Verify & Activate
          </Button></div>
        </div>
      </Modal>
      <Text size="lg" weight={500}>
        Welcome to Drive Away, {upperFirst(type)} with
      </Text>

      <Group grow mb="md" mt="md">
        <div onClick={()=> window.location.href = `${url}/auth/google`} className={styles.google}><img src={google} alt="" />Google</div>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(() => { toggleDisclosure(); handleSubmit() })}>
        <Stack>
          <LoadingOverlay visible={visible} overlayBlur={2} />
          {type === 'register' && (
            <TextInput
              required
              label="Name"
              placeholder="Your Name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="example@host.com"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your Password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            radius="md"
          />
          {type === 'register' && (
            <TextInput
              required
              label="Address"
              placeholder="Your Address"
              value={form.values.address}
              onChange={(event) => form.setFieldValue('address', event.currentTarget.value)}
              radius="md"
            />

          )}
          {type === 'register' && (
            <Checkbox
              required
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
          )}
          {type === 'register' && <ReCAPTCHA sitekey={import.meta.env.VITE_REACT_APP_SITE_KEY} ref={captchaRef} />}
          {type === 'register' && capthca && <div>Please Enter captcha</div>}
        </Stack>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}