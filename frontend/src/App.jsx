import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import Dashboard from './pages/Dashboard';
import { Notifications } from '@mantine/notifications';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Notifications position='bottom-center' />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
