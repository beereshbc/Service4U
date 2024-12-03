import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedAgents = ({ speciality, agentId }) => {

    const { agents } = useContext(AppContext)
    const [relAgent, setRelAgents] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (agents.length > 0 && speciality) {
            const agentsData = agents.filter((agent) => agent.speciality === speciality && agent._id !== agentId)
            setRelAgents(agentsData)

        }
    }, [agents, agentId, speciality])

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
            <h1 className='text-3xl font-medium'>Realated Service Providers</h1>
            <p className='sm:w-1/2.5 text:center text-sm'>Simply browse through our extensive list of trusted Service Providers</p>
            <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                {relAgent.slice(0, 4).map((item, index) => (
                    // meliro agents.slice atra agents ge relAgent replace madbeku but nan elli agent add madini bcz adu ennu specility ge filter agilla     
                    <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                        <img className='bg-blue-50' src={item.image} alt="" />
                        <div className='p-4'>
                            <div className={`flex items-center gap-2 text-sm text-center ${item.available ? ' text-green-600' : 'text-gray-500'}`}>
                                <p className={`w-2 h-2 ${item.available ? 'bg-green-700' : 'bg-gray-500'}  rounded-full`}></p><p>{item.available ? 'Available' : 'Un Available'}</p>
                            </div>
                            <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                            <p className='text-gray-600 text-sm'>{item.speciality}</p>
                        </div>
                    </div>

                ))}
            </div>
            <button onClick={() => { navigate('/services'); scrollTo(0, 0) }} className='bg-blue-200 text-gray-900 px-12 py-3 rounded-full mt-10 outline-none'>More..</button>
        </div>
    )
}

export default RelatedAgents