import validator from "validator"
import bcrypt from "bcrypt"
import { v2 as cloudinary } from 'cloudinary'
import agentModel from "../models/agentModel.js"
import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointmentModel.js"




//API for adding Agent

const addAgent = async (req, res) => {

    try {
        const { name, email, password, speciality, education, experience, about, fees, address, city } = req.body
        const imageFile = req.file

        //checking for all data to add agent. if any one is missing it detact and send a messge Missing details
        if (!name || !email || !password || !speciality || !education || !experience || !about || !fees || !address || !city) {
            return res.json({ success: false, message: 'Missing Details' });
        }
        

        //validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Please enter valid Email' });
        }

        //validating Strong password
        if (password.length < 8) {
            return res.json({ success: false, message: 'Please enter a strong password' });
        }

        //hashing agent password

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        const agentData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            education,
            experience,
            about,
            fees,
            city,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newAgent = new agentModel(agentData)
        await newAgent.save()

        return res.json({ success: true, message: 'Agent Added' });


    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message });
    }

}

//API for the admin login

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })

        } else {
            res.json({ message: "Invalid Credentials" })
        }

        
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message });
    }
}

//API to get All Agents list for Admin panel
const allAgents = async (req, res) => {
    try {
        
        const agents = await agentModel.find({}).select('-password')
        res.json({success:true, agents})

    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:error.message})
    }
}


//API to get all appointments list

const appointmentsAdmin = async (req, res) => {

    try {
        const appointments = await appointmentModel.find({})
        res.json({success:true, appointments})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//API for appointment cancellation
const appointmentCancel = async (req, res) => {

    try {

        const {appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        //Releasing Agents slot after the cancellation

        const { agentId, slotDate, slotTime } = appointmentData

        const agentData = await agentModel.findById(agentId)

        let slots_booked = agentData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await agentModel.findByIdAndUpdate(agentId, { slots_booked })

        res.json({ success: true, message: "Appointment Cancelled" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//API to get dashboard data for admin panel

const adminDashboard = async (req, res) => {

    try {
        
        const agents = await agentModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            agents:agents.length,
            appointments:appointments.length,
            customers:users.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        res.json({success:true, dashData})


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

export { addAgent, loginAdmin, allAgents, appointmentsAdmin, appointmentCancel, adminDashboard}