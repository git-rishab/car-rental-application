import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import Dashboard from './pages/Dashboard';
import { Notifications } from '@mantine/notifications';
import Addcar from './pages/Addcar';
import Page404 from './pages/Page404';
import UnAuthenticated from './components/UnAuthenticated';
import ProfileEdit from './pages/ProfileEdit';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Notifications position='bottom-center' />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/car/:action" element={<Addcar />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path='/unauthenticated' element={<UnAuthenticated />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
