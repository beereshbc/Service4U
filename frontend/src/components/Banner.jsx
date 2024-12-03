import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate =useNavigate()
  return (
    <div className='flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10'>
        {/* Left Side */}
        <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
            <div className='text-xl sm:text-1.5xl md:text-2.5xl lg:text-4xl font-semibold text-white'>
                <p>Book Appointment With </p>
                <p className='mt-4'>100+ Trusted Service Providers</p>
            </div>
            <button onClick={()=>{navigate('/login'); scrollTo(0,0)}} className='bg-white text-sm sm:text-base p-3 text-gray-600 px-8 py3 rounded-full mt-6 hover:scale-105 transition-all'>Create Account</button>
        </div>

        {/* Right Side */}
        <div className='hidden md:block max-w-[600px] lg:w-[370px] relative'>
            <img className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt="" />
        </div>
    </div>
  )
}

export default Banner