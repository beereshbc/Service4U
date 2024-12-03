import { createContext, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify'

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):"")
    const [agents, setAgents] = useState([])
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    
    const getAllAgents = async () => {
        try {
            
            const { data } = await axios.post(backendUrl + '/api/admin/all-agents', {}, {headers:{aToken}})
            if (data.success) {
                setAgents(data.agents)
                console.log(data.agents)
            } else {
                toast.error(data.messege)
            }
        } catch (error) {
            toast.error(data.messege)
        }
    }

    const changeAvailability = async (agentId) => {
        
try {  
const {data} = await axios.post(backendUrl +'/api/admin/change-availability', {agentId}, {headers: {aToken}})
    if (data.success) {
        toast.success(data.message)
        getAllAgents()
    } else {
        toast.error(data.message)
    }
} catch (error) {
    toast.error(error.message)
}

    }

    const getAllAppointments = async () => {

        try {
            
            const {data} = await axios.get(backendUrl + '/api/admin/appointments', {headers:{aToken}}) 

            if (data.success) {
                setAppointments(data.appointments)
                console.log(data.appointments);
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }

    }

    const cancelAppointment = async (appointmentId) => {

        try {
            const {data} = await axios.post(backendUrl + '/api/admin/cancel-appointment', {appointmentId}, {headers:{aToken}})
            if (data.success) {
                toast.success(data.message)
                getAllAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(data.message)
        }

    }

    const getDashData = async ()=> {
        try {
            
            const {data} = await axios.get(backendUrl + '/api/admin/dashboard', {headers:{aToken}})

            if (data.success) {
                setDashData(data.dashData)
                console.log(data.dashData);
            } else {
                toast.error(data.error)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const value = {
        aToken, setAToken,
        backendUrl, agents,
        getAllAgents,
        changeAvailability,
        appointments,
        setAppointments,
        getAllAppointments,
        cancelAppointment,
        getDashData,
        dashData
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider