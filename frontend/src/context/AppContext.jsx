import { createContext } from "react";
import { agents } from "../assets/assets";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from 'react-toastify'

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol = '\u20B9'

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [agents, setAgents] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false )
    const [userData, setUserData] = useState(false)



    const getAllAgentsData = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/agent/list')
            if (data.success) {
                setAgents(data.agents)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }

    }

    const loadUserProfileData = async () => {
        try {
            
            const {data} = await axios.get(backendUrl + '/api/user/get-profile', {headers:{token}})

            if(data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const value = {
        agents,
        currencySymbol,
        backendUrl,
        token,
        setToken,
        userData, 
        setUserData,
        loadUserProfileData,
        getAllAgentsData,
    }

    useEffect(() => {
        getAllAgentsData()
    }, [])

    useEffect (() => {
        if(token) {
            loadUserProfileData()
        } else {
            setUserData(false)
        }
    }, [token])


    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider