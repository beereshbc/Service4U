import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AgentContext } from '../context/AgentContext'

const SignIn = () => {

    const [state, setState] = useState("Admin")
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { setAToken, backendUrl } = useContext(AdminContext)
    const {setSToken} = useContext(AgentContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            if (state === 'Admin') {
                const {data} = await axios.post(backendUrl + '/api/admin/login', {email, password})
                if (data.success) {

                    //Atoken will be set in lcalstorage as well as setter function
                    localStorage.setItem('aToken', data.token)
                    setAToken(data.token);
                } else {
                    toast.error(data.message)
                }
            } else {
                const {data} = await axios.post(backendUrl + '/api/agent/login', {email,password})
                if (data.success) {

                    //Atoken will be set in lcalstorage as well as setter function
                    localStorage.setItem('sToken', data.token)
                    setSToken(data.token);
                    console.log(data.token);
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {

        }

    }


    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm'>
                <p className='text-2xl font-semibold m-auto '><span className='text-primary'>  {state} </span>Login</p>
                <div className='w-full'>
                    <p>Email</p>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' />
                </div>
                <button className='border border-[#DADADA] rounded-md w-full py-2 mt-1 text-base bg-primary text-white'>Login</button>

                {
                    state === "Admin"
                        ? <p>Agent Login?<span onClick={() => setState("Agent")} className='text-primary underline cursor-pointer'> Click here</span></p>
                        : <p>Admin Login?<span onClick={() => setState("Admin")} className='text-primary underline cursor-pointer'> Click here</span></p>
                }
            </div>
        </form>
    )
}

export default SignIn
