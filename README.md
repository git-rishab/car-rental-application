# Car Rent Application

## Table of Contents

- [Introduction](#introduction)
- [Tech Stack](#tech-stack)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Schema Design](#schema-design)
- [Glimpse of website](#glimpse-of-website)

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

## Schema Design

![Schema Design](https://github.com/git-rishab/car-rental-application/assets/114337213/be373ceb-7021-46b2-af38-b2bb6bc0aa16)

## Glimpse of Website!
![Landing Page](https://github.com/git-rishab/car-rental-application/assets/114337213/33cf9f1d-78d0-40ab-80cb-e51f3737c62e)
![Individual car](https://github.com/git-rishab/car-rental-application/assets/114337213/6cbea855-dc24-4e3b-b755-5383d1fefd8b)
![Dashboard](https://github.com/git-rishab/car-rental-application/assets/114337213/5c9b20c5-7ab2-4bbf-ba1d-4c7471045fff)
![2FA](https://github.com/git-rishab/car-rental-application/assets/114337213/bbee765d-2943-4170-b7f1-1e71f283e2e1)
![Add car](https://github.com/git-rishab/car-rental-application/assets/114337213/cc8a6aa5-4794-4671-9dbe-aee3891ce92b)
![Payment Gateway](https://github.com/git-rishab/car-rental-application/assets/114337213/bdc43f11-d2d8-401d-9eb4-40a6541cd982)

