import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary';
import agentModel from '../models/agentModel.js';
import appointmentModel from '../models/appointmentModel.js';
import razorpay from 'razorpay'


//API to register user
const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body

        //check details are enterd or not
        if (!name || !password || !email) {
            return res.json({ success: false, message: "Missing Details" });
        }

        //validating email id
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter Valid Email" });
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Enter A Strong Password" });
        }

        //hashing the user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }


        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.json({ success: true, token })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }


}

// API for user login

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not Exist kindly register" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid Credentials" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

// API to get user profile data

const getProfile = async (req, res) => {

    try {

        const { userId } = req.body
        const userData = await userModel.findById(userId).select("-password")

        res.json({ success: true, userData })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

//API update user profile

const updateProfile = async (req, res) => {

    try {

        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.file

        if (!name || !phone || !dob || !gender || !address  ) {
            return res.json({ success: false, message: "Data Missing" })
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })

        if (imageFile) {

            //Upload image to cloudinary 
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageURL })

        }

        res.json({ success: true, message: 'Profile Updated' })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


//API to book appointment

const bookAppointment = async (req, res) => {

    try {

        const { userId, agentId, slotDate, slotTime } = req.body

        const agentData = await agentModel.findById(agentId).select('-password')

        //my-code for address check

        if (!agentData.available) {
            return res.json({ success: false, message: "Service provider not Available" });
        }

        let slots_booked = agentData.slots_booked

        //Checking for slot availablity
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Slots not available" })
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')

        delete agentData.slots_booked

        const appointmentData = {
            userId,
            agentId,
            userData,
            agentData,
            amount: agentData.fees,
            address: userData.address,
            slotDate,
            slotTime,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        //Save new slots data in agentData
        await agentModel.findByIdAndUpdate(agentId, { slots_booked })

        res.json({ success: true, message: 'Appointment Booked' })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}


//API to get user appointments for frontend my-appointments page
const listAppointment = async (req, res) => {

    try {

        const { userId } = req.body
        const appointments = await appointmentModel.find({ userId })

        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//API to cancel Appointment
const cancelAppointment = async (req, res) => {

    try {

        const { userId, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        //Verify appointment user
        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: "Unauthorized Action" })
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        //Releasing Doctores slot after the cancellation

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

//API to make payment of appointment using razorpay
const razorpayInstance = new razorpay({
    key_id: 'process.env.RAZORPAY_KEY_ID',
    key_secret: 'process.env.RAZORPAY_KEY_SECRET'
})


const paymentRazorpay = async (req, res) => {

    try {


        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentId || appointmentData.cancelled) {
            return res.json({ success: false, message: "Appointment Cancelled or not found" })
        }


        //creating options for razorpay payment
        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            receipt: appointmentId,
        }

        //creation of an order  ......await ettu kelage
        const order = razorpayInstance.orders.create(options)

        res.json({ success: true, order })
    }catch (error) {
        console.log(error);
        console.log(appointmentData.cancelled);
        res.json({ success: false, message: error.message })
    }
}

//API to verify payment of razorpay
const verifyRazorpay = async (req, res) => {
    try {
        
        const {razorpay_order_id} = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if (orderInfo.status === 'paid') {
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
            res.json({success:true, message:"Payment Successful"})
        }  else {
            res.json({success:false, message:"Payment failed"})
        }

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
} 

// const agentCityList = async (req, res) => {
//     try {
//         const { city } = req.body; // Extract the city from the request body

//         if (!city) {
//             return res.status(400).json({ message: "City is required" }); // Send a proper response
//         }

//         const agents = await agentModel.find({ city }).limit(10); // Query agents by city with a limit

//         if (agents.length === 0) {
//             return res.status(404).json({ message: "No agents found in the specified city" });
//         }

//         res.status(200).json({ agents }); // Return the agents as a JSON response
//     } catch (error) {
//         console.error("Error querying agents:", error.message);
//         res.status(500).json({ message: "Internal server error" }); // Handle errors gracefully
//     }


// };


export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazorpay, verifyRazorpay } 