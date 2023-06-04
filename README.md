# Car Rent Application

## Table of Contents

- [Introduction](#introduction)
- [Tech Stack](#tech-stack)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)

## Introduction

The Car Rent Application is a web-based platform that allows users to rent cars according to their needs. It provides a user-friendly interface for renting cars and listing cars for rent. The application utilizes modern technologies such as React, Maintain UI, Redux, Node.js, Redis, Express, and MongoDB to deliver a seamless user experience.


## Tech Stack

The Car Rent Application is built using the following technologies:

- Frontend: React, Maintain UI, Redux
- Backend: Node.js, Redis, Express, MongoDB

## Key Features

The Car Rent Application offers the following key features:

- **2FA Authentication:** Secure two-factor authentication is implemented to protect user accounts.
- **Google OAuth:** Users can sign in using their Google accounts for a convenient login experience.
- **Payment Integration:** Seamless payment integration is included to enable users to make rental payments easily.

## Getting Started

To get started with the Car Rent Application, follow the steps below.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/git-rishab/car-rental-application.git
  
2. Install Dependencies:

   ```bash
   npm i 
  
3. Run backend server:

   ```bash
   npm run server

4. Start Frontend

   ```bash
   npm run start
   
## API Endpoints

The Car Rent Application provides the following API endpoints:

### User Route
   - `POST /user/login` : Authenticates a user and generates an access token
   - `POST /user/register` : Registers a new user
   - `POST /user/logout` : Logs out the user and invalidates their session
   - `GET /user` : Data of individual user
   - `PATCH /user/wishlist/add` : Add cars to the wishlist of the individual user
   - `PATCH /user/wishlist/remove` : Remove cars from the wishlist of individual user
   - `PATCH /user/update/password`: Resets the password of the user
   - `PATCH /user/update/details` : update the details of the user

### Car Route
   - `GET /car` : Get all the car details available for rent
   - `POST /car/add` : Add a car for rent
   - `POST /car/payment` : Create a request for payment
   - `PATCH /car/edit` : Edit the details of a listed car
   - `PATCH /car/rent` : Rent a car
   - `DELETE /car/delete` : Remove a car from search results
   - `GET /car/:carId` : Data of an individual car

### OTP Route
   - `GET /otp/generate` : Generates QR for setup
   - `GET /otp/validate` : Validates the OTP while set up
   - `GET /otp/verify` : Verifies the OTP everytime user Logs In
   - `GET /otp/disable` : Removes the 2FA

## Glimpse of Website!
[LandingPage](https://github.com/git-rishab/car-rental-application/assets/114337213/a5501d84-b7a1-4acd-8c49-8219cc2fa8ba)
![Individual Car](https://github.com/git-rishab/car-rental-application/assets/114337213/cdc5c7e5-72b7-4ffa-b4d7-e7a8fb2e9ee6)
![Dashboard](https://github.com/git-rishab/car-rental-application/assets/114337213/ba98167f-7062-48ab-8339-22efb5a54b5d)
![2FA](https://github.com/git-rishab/car-rental-application/assets/114337213/ad548d05-3edc-4415-8698-fb6ac551fd30)
![Add cars](https://github.com/git-rishab/car-rental-application/assets/114337213/5a31246c-b29f-4ef7-aded-e9c9704f5470)
![Payment Gateway](https://github.com/git-rishab/car-rental-application/assets/114337213/636e5326-0f9f-493c-8f59-6dee7e35fe8d)
