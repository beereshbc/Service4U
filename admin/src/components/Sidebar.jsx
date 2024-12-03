import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AgentContext } from '../context/AgentContext'

const Sidebar = () => {

    const { aToken } = useContext(AdminContext)
    const { sToken } = useContext(AgentContext)

    return (
        <div className='min-h-screen bg-white border-r' draggable>
            {
                aToken && <ul className='text-[#515151] mt-5'>
                    <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer  ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary ' : ''}`} to={'/admin-dashboard'}>
                        <img src={assets.home_icon} alt="" />
                        <p className='hidden md:block'>Dashboard</p>
                    </NavLink  >

                    <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer  ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary ' : ''}`} to={'/all-appointments'}>
                        <img src={assets.appointment_icon} alt="" />
                        <p className='hidden md:block'>Appointments</p>
                    </NavLink>

                    <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer  ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary ' : ''}`} to={'/add-agent'}>
                        <img src={assets.add_icon} alt="" />
                        <p className='hidden md:block'>Add Agent</p>
                    </NavLink>

                    <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer  ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary ' : ''}`} to={'/agent-list'}>
                        <img src={assets.people_icon} alt="" />
                        <p className='hidden md:block'>Agent List</p>
                    </NavLink>
                </ul>
            }

{
                sToken && <ul className='text-[#515151] mt-5'>
                    <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer  ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary ' : ''}`} to={'/agent-dashboard'}>
                        <img src={assets.home_icon} alt="" />
                        <p className='hidden md:block'>Dashboard</p>
                    </NavLink  >

                    <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer  ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary ' : ''}`} to={'/agent-appointments'}>
                        <img src={assets.appointment_icon} alt="" />
                        <p className='hidden md:block'>Appointments</p>
                    </NavLink>

                    <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer  ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary ' : ''}`} to={'/agent-profile'}>
                        <img src={assets.people_icon} alt="" />
                        <p className='hidden md:block'>Agent Profile</p>
                    </NavLink>
                </ul>
            }
        </div>
    )
}

export default Sidebar
