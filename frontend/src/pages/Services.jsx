import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Services = () => {


  const { speciality } = useParams()
  const [filterServ, setFilterServ] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const { agents } = useContext(AppContext)
  const navigate = useNavigate()


  // line 18 agent => agent is serviceProvider anth ettu change madeni nedithathi
  const applyFilter = () => {
    if (speciality) {
      setFilterServ(agents.filter(agent => agent.speciality === speciality))
    } else {
      setFilterServ(agents)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [agents.speciality, speciality])


  return (
    <div>
      <p className='text-gray-600'>Browse through the Service specialists</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button onClick={() => setShowFilter(prev => !prev)} className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ""}`}>Filters</button>
        <div className={`flex-col gap-4 text-sm text-gray-600  ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={() => speciality === 'Electrician' ? navigate('/services') : navigate('/services/Electrician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Electrician" ? "bg-indigo-100 text-black " : ""}`}>Electrician</p>
          <p onClick={() => speciality === 'Vehical Cleaning' ? navigate('/services') : navigate('/services/Vehical Cleaning')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Vehical Cleaning" ? "bg-indigo-100 text-black " : ""}`}>Vehical Cleaning</p>
          <p onClick={() => speciality === 'Carpenter' ? navigate('/services') : navigate('/services/Carpenter')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Carpenter" ? "bg-indigo-100 text-black " : ""}`}>Carpenter</p>
          <p onClick={() => speciality === 'Grass Cutter' ? navigate('/services') : navigate('/services/Grass Cutter')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Grass Cutter" ? "bg-indigo-100 text-black " : ""}`}>Grass Cutter</p>
          <p onClick={() => speciality === 'House Cleaner' ? navigate('/services') : navigate('/services/House Cleaner')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "House Cleaner" ? "bg-indigo-100 text-black " : ""}`}>House Cleaner</p>
          <p onClick={() => speciality === 'WiFi Installation' ? navigate('/services') : navigate('/services/WiFi Installation')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "WiFi Installation" ? "bg-indigo-100 text-black " : ""}`}>WiFi Installation</p>
        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {
            filterServ && filterServ.map((item, index) => (<div key={index} onClick={() => navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' >
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
      </div>
    </div>

  )
}

export default Services
