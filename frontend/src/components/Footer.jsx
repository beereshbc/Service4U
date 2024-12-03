import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate = useNavigate()
    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                {/* Left Section */}
                <div>
                    <img  onClick={()=>{navigate('/'); scrollTo(0,0)}} className='mb-5 cursor-pointer w-40' src={assets.logo} alt="" />
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt aliquid aspernatur, quo provident minus cupiditate! ipsum dolor sit amet consectetur adipisicing elit. Ipsum, rem.</p>
                </div>

                {/* Centre Section */}
                <div>
                    <p className='text-xl font-medium mb-5'>Company</p>
                    <ul className='flex flex-col gap-2 cursor-pointer text-gray-600'>
                        <li onClick={()=>{navigate('/'); scrollTo(0,0)}}>Home</li>
                        <li onClick={()=>{navigate('/about'); scrollTo(0,0)}}>About us</li>
                        <li onClick={()=>{navigate('/contact'); scrollTo(0,0)}}>Contact us</li>
                        <li onClick={()=>{navigate('/'); scrollTo(0,0)}}>Privacy policy</li>
                    </ul>
                </div>

                {/* Right Section */}
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-2 cursor-pointer text-gray-600'>
                        <li><a href="callto:6360995219">+91-6360995219</a></li>
                        <li> <a href="mailto:service4u2024@gmail.com">bcbeereshkumar@gmail.com</a></li>
                    </ul>
                </div>
            </div>
                {/* Copyright text */}
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2024@ Service4U - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer