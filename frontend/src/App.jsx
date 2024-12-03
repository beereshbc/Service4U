import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Services from './pages/Services'
import MyProfile from './pages/MyProfile'
import Appointment from './pages/Appointment'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import MyAppointments from './pages/MyAppointments'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/services' element={ <Services /> } />
        <Route path='/services/:speciality' element={ <Services /> } />
        <Route path='/my-profile' element={ <MyProfile /> } />
        <Route path='/about' element={ <About /> } />
        <Route path='/contact' element={ <Contact /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/my-appointments' element={ <MyAppointments /> } />
        <Route path='/appointment/:agentId' element={ <Appointment /> } />

      </Routes>
      <Footer />
    </div>
  )
}

export default App