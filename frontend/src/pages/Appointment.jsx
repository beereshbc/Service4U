import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets, agents } from '../assets/assets'
import RelatedAgents from '../components/RelatedAgents'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {

  const { agentId } = useParams()
  const { agents, currencySymbol, backendUrl, token, getAllAgentsData } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const navigate = useNavigate()

  const [agentInfo, setAgentInfo] = useState(null)
  const [agentSlots, setAgentSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')


  const fetchAgentInfo = async () => {
    // ============> Error useParams doc2 : agentId
    const agentInfo = agents.find(agent => agent._id === agentId)
    setAgentInfo(agentInfo)
    console.log(agentInfo)
    // console.log(agents._id)
    // console.log(agents[1]._id)
  }


  const getAvailableSlots = async () => {
    setAgentSlots([])


    let today = new Date()

    for (let i = 0; i < 7; i++) {
      //Getting date with index
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      //Setting end time of the date with index
      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(24, 0, 0, 0)

      //Setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)

      } else {
        currentDate.setHours(0)
        currentDate.setMinutes(0)
      }
      

      let timeSlots = []

      // add slot to array
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        const slotDate = day + "_" + month + "_" + year
        const slotTime = formattedTime


        const isSlotAvailable = agentInfo.slots_booked[slotDate] && agentInfo.slots_booked[slotDate].includes(slotTime) ? false : true

        if (isSlotAvailable) {
          // add slot array
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })

        }


        //Increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 60)
      }

      setAgentSlots(prev => ([...prev, timeSlots]))

    }

  }


  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book Appointment')
      return navigate("/login")
    }

    try {

      const date = agentSlots[slotIndex][0].datetime

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      const slotDate = day + "_" + month + "_" + year

      console.log(slotDate);

      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { agentId, slotDate, slotTime }, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        getAllAgentsData()
        navigate('/my-appointments')

      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }



  useEffect(() => {
    fetchAgentInfo()
  }, [agents, agentId])

  useEffect(() => {
    getAvailableSlots()
  }, [agentInfo])


  //Time setting effect
  // useEffect (()=>{
  //   console.log(agentSlots)
  // }, [agentSlots])


  return agentInfo && (
    <div>
      {/* -----------------Agent details----------------------- */}

      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={agentInfo.image} alt="" />
        </div>
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          {/* -------------------Agent info name education experiance---------------------------- */}

          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>

            {agentInfo.name}
            <img className='w-5' src={assets.verified_icon} alt="" />
            <p>⭐⭐⭐⭐⭐</p>
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{agentInfo.education} . {agentInfo.speciality}</p>
            
            <button className='py-0.5 px-2 border text-xs rounded-full'>{agentInfo.experience}</button>
          </div>

          {/* ================Agent About======================= */}

          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
              About <img src={assets.info_icon} alt="" /></p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{agentInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>
            Appointment fee: <span className='text-gray-600'>{currencySymbol} {agentInfo.fees}</span>
          </p>
          
        </div>
      </div>

      {/* =================Bookinuig slots================== */}
      <div>
        <p className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>Booking Slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            agentSlots.length && agentSlots.map((item, index) => (
              <div onClick={() => setSlotIndex(index)} key={index} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-50'}`}>
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {
            agentSlots.length && agentSlots[slotIndex].map((item, index) => (
              <p key={index} onClick={() => setSlotTime(item.time)} className={` border-gray-500 text-sm font flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'border border-gray-50'}`}>
                {item.time.toLowerCase()}
              </p>
            ))
          }
        </div>
        <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an Appointment</button>
      </div>
      {/* ================Listing related agents=========Realated.jsx  new file============= */}
      <RelatedAgents agentId={agentId} speciality={agentInfo.speciality} />
    </div>
  )
}

export default Appointment