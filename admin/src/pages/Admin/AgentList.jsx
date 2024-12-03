import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext.jsx'

const AgentList = () => {

  const { agents, aToken, getAllAgents, changeAvailability } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllAgents()
    }
  },[aToken])


  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Agents</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {

          agents.map((item, index) => (
            <div key={index} className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group'>
              <img src={item.image} alt="" className='bg-indigo-50 group-hover:bg-primary transition-all duration-500'/>
              <div className='p-4'>
                <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                <p className='text-zinc-600 text-sm'>{item.speciality}</p>
                <div className='mt-2 flex items-center gap-1 text-sm'>
                  <input onChange={() => changeAvailability(item._id)} type="checkbox" checked={item.available} />
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))

        }
      </div>
    </div>
  )
}

export default AgentList
