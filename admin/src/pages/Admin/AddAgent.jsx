import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddAgent = () => {


    const [agentImg, setAgentImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('Painter')
    const [education, setEducation] = useState('')
    const [city, setCity] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const { backendUrl, aToken } = useContext(AdminContext)


    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            if (!agentImg) {
                return toast.error("Image Not Select")
            }

            const formData = new FormData()
            formData.append('image', agentImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('speciality', speciality)
            formData.append('city', city)
            formData.append('education', education)
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

            //console log formdata
            formData.forEach((value, key) => {
                console.log(`${key} : ${value}`);
            })

            const successRefresh = () => {
                setAgentImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setEducation('')
                setAbout('')
                setFees('')
                setCity('')
            } 

            const { data } = await axios
                .post(backendUrl + '/api/admin/add-agent', formData, { headers: { aToken } });

                if (data.success) {
                    toast.success(data.message)
                    successRefresh()
                } else {
                    toast.error(data.message)
                }

        } catch (error) {
            toast.error(data.message)
            console,log(data.message)
        }
    }


    return (
        <form onSubmit={onSubmitHandler} action="" className='m-5 w-full '>

            <p className='mb-3 text-lg font-medium'>Add Agent</p>


            <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
                <div className='flex items-center gap-4 mb-8 text-gray-500'>
                    <label htmlFor="agent-img">
                        <img src={agentImg ? URL.createObjectURL(agentImg) : assets.upload_area} className='w-16 bg-gray-100 rounded-full cursor-pointer' alt="" />
                    </label>
                    <input onChange={(e) => setAgentImg(e.target.files[0])} type="file" id='agent-img' hidden />
                    <p>Upload Agent <br /> Picture</p>
                </div>
                <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
                    <div className='w-full lg:flex-1 flex flex-col gap-4'>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Agent Name</p>
                            <input onChange={(e) => setName(e.target.value)} value={name} className='border rounded px-3 py-2' type="text" placeholder='Name' required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Agent Email</p>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} className='border py-2 rounded px-3' type="email" placeholder='Email' required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Agent Password</p>
                            <input onChange={(e) => setPassword(e.target.value)} value={password} className='border  py-2 rounded px-3' type="password" placeholder='Password' required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Experience</p>
                            <select onChange={(e) => setExperience(e.target.value)} value={experience} className='border  py-2 rounded px-3' name="" >
                                <option value="1 Year">1 Year</option>
                                <option value="2 Year">2 Year</option>
                                <option value="3 Year">3 Year</option>
                                <option value="4 Year">4 Year</option>
                                <option value="5 Year">5 Year</option>
                                <option value="6 Year">6 Year</option>
                                <option value="7 Year">7 Year</option>
                                <option value="8 Year">8 Year</option>
                                <option value="9 Year">9 Year</option>
                                <option value="10 Year">10 Year</option>
                                <option value="10+ Years">10+ Years</option>
                            </select>
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Fees</p>
                            <input onChange={(e) => setFees(e.target.value)} value={fees} className='border rounded px-3 py-2' type="number" placeholder='Fees' required />
                        </div>

                    </div>

                    <div className='w-full lg:flex-1 flex flex-col gap-4'>

                        <div>
                            <p>Speciality</p>
                            <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='border py-2 rounded px-3' name="" id="">
                                <option value="Painter">Painter</option>
                                <option value="Electrician">Electrician</option>
                                <option value="Vehical Cleaning">Vehical Cleaning</option>
                                <option value="Carpenter">Carpenter</option>
                                <option value="Grass Cutter">Grass Cutter</option>
                                <option value="House Cleaner">House Cleaner</option>
                                <option value="WiFi Installation">WiFi Installation</option>
                                <option value="AC Installation">AC Installation</option>
                                <option value="Toilet Cleaning">Toilet Cleaning</option>
                                <option value="Roof Cleaning">Roof Cleaning</option>
                                <option value="Beekeeper">Beekeeper</option>
                                <option value="Glass Installation">Glass Installation</option>
                                <option value="Tails Installer">Tails Installer</option>
                                <option value="Flower Decorater">Flower Decorater</option>
                                <option value="Solar Installation">Solar Installation</option>
                                <option value="Laundry">Laundry</option>
                                <option value="Event Planer">Event Planer</option>
                                <option value="Plumber">Plumber</option>
                                <option value="Chef">Chef</option>
                                <option value="Roofer">Roofer</option>
                                <option value="Puncher">Puncher</option>
                                
                            </select>
                        </div>

                        <div>
                            <p>Education</p>
                            <input onChange={(e) => setEducation(e.target.value)} value={education} className='border rounded py-2 px-3' type="text" placeholder='Education' required />
                        </div>

                        <div className=''>
                            <select onChange={ (e) =>setCity( e.target.value)} value={city} name="" className='border py-2 rounded px-3 mb-3' id="">
                                <option value="Bagalkot">Bagalkot</option>
                                <option value="Bengaluru Urban">Bengaluru Urban</option>
                                <option value="Bengaluru Rural">	Bengaluru Rural</option>
                                <option value="Belagavi">	Belagavi</option>
                                <option value="Ballari">Ballari</option>
                                <option value="Bidar">	Bidar</option>
                                <option value="Vijayapur">	Vijayapur</option>
                                <option value="Chamarajanagar">Chamarajanagar</option>
                                <option value="Chikballapur">Chikballapur</option>
                                <option value="Chikkamagaluru">Chikkamagaluru</option>
                                <option value="Chitradurga">	Chitradurga</option>
                                <option value="Dakshina Kannada">Dakshina Kannada</option>
                                <option value="Davanagere">	Davanagere</option>
                                <option value="Dharwad">Dharwad</option>
                                <option value="Gadag">Gadag</option>
                                <option value="Kalaburagi">Kalaburagi</option>
                                <option value="Hassan">Hassan</option>
                                <option value="Haveri">Haveri</option>
                                <option value="Kodagu">Kodagu</option>
                                <option value="Kolar">Kolar</option>
                                <option value="Koppal">Koppal</option>
                                <option value="Mandya">Mandya</option>
                                <option value="Mysuru">Mysuru</option>
                                <option value="Raichur">Raichur</option>
                                <option value="Ramanagara">Ramanagara</option>
                                <option value="Shivamogga">Shivamogga</option>
                                <option value="Tumakuru">Tumakuru</option>
                                <option value="Udupi">Udupi</option>
                                <option value="Uttara Kannada">Uttara Kannada</option>
                                <option value="Yadgir">Yadgir</option>
                                <option value="Vijayanagara">Vijayanagara</option>
                               
                            </select>
                            <p>Address</p>
                            <input onChange={(e) => setAddress1(e.target.value)} value={address1} className='border rounded py-2 px-3  m-2' type="text" placeholder='Address 1' required />
                            <input onChange={(e) => setAddress2(e.target.value)} value={address2} className='border rounded py-2 px-3 m-2' type="text" placeholder='Address 2' required />

                        </div>

                        <div>
                            <p className='mt-4 mb-2'>About Agent</p>
                            <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded' placeholder='Write About Agent Service' rows={5} required />
                        </div>
                        <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full'>Add Agent</button>
                    </div>
                </div>

            </div>

        </form>
    )
}

export default AddAgent
