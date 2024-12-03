import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
          <div className='text-center text-2xl pt-10 text-gray-500'>
            <p>About <span className='text-gray-900 font-medium'>us</span></p>
          </div>
          <div className='my-10 flex flex-col md:flex-row gap-12'>
            <img className='w-full md:max-w-[250px] rounded' src={assets.about_image} alt="" />
            <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
              {/* ================Right side================== */}
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium possimus officia laboriosam deleniti saepe assumenda vel omnis fuga natus perferendis, quas distinctio culpa consectetur minima, cumque sint fugit totam quos?</p>
              <p>Lorem ipsum dolor, sit ame Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore nulla corporis laudantium nam laboriosam animi inventore tempore. Nihil, similique atque? t consectetur adipisicing elit. Provident similique porro ab sit aspernatur iure impedit harum voluptatum error repudiandae quibusdam beatae sapiente dignissimos eligendi, obcaecati quis quam ipsum distinctio!</p>
              <b className='text-gray-800'>Our Vision</b>
              <p>Our vision Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad perferendis pariatur hic molestiae? Voluptatem?</p>
            </div>
          </div>

          <div className='text-xl my-4'>
            <p>Why <span className='text-gray-700 font-semibold'>Choose us</span></p>
          </div>
          <div className='flex flex-col md:flex-row mb-20 gap-4'>
            <div className='border px-10 md:px-16 sm:py-16 py-8 flex flex-col gap-5 text-[15px] hover:bg-primary rounded hover:text-white transition-all duration-300 text-gray-600 cursor-pointer '>
              <b>Efficiency</b>
              <p>Streamlined appointment scheduling that fits into your busy life style</p>
            </div>
            <div className='border px-10 md:px-16 sm:py-16 py-8 flex flex-col gap-5 text-[15px] hover:bg-primary rounded hover:text-white transition-all duration-300 text-gray-600 cursor-pointer '>
              <b>Convinience:</b>
              <p>Access to a network trusted services Professional in your area</p>
            </div>
            <div className='border px-10 md:px-16 sm:py-16 py-8 flex flex-col gap-5 text-[15px] hover:bg-primary rounded hover:text-white transition-all duration-300 text-gray-600 cursor-pointer '>
              <b>Personalization</b>
              <p>Tailored recommendations and reminders to help you stay on top of your Service Experiance</p>
            </div>


          </div>

    </div>

  )
}

export default About