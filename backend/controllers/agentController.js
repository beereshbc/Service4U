import agentModel from "../models/agentModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"



const changeAvailability = async (req, res) => {
    try {
        const { agentId } = req.body

        const agentData = await agentModel.findById(agentId)
        await agentModel.findByIdAndUpdate(agentId, { available: !agentData.available })
        res.json({ success: true, message: 'Availablity Changed' })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

const agentList = async (req, res) => {

    try {

        const agents = await agentModel.find({}).select(['-password', '-email'])

        res.json({ success: true, agents })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }

}

//API for Agent Login

const loginAgent = async (req, res) => {

    try {

        const { email, password } = req.body
        const agent = await agentModel.findOne({ email })

        if (!agent) {
            return res.json({ success: false, message: 'Invalid credentials' })
        }

        const isMatch = await bcrypt.compare(password, agent.password)

        if (isMatch) {

            const token = jwt.sign({ id: agent._id }, process.env.JWT_SECRET)

            res.json({ success: true, token })

        } else {
            return res.json({ success: false, message: 'Invalid credentials' })
        }

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }

}


// API to get doctor appointments for doctore panel
const appointmentsAgent = async (req, res) => {
    try {

        const { agentId } = req.body
        const appointments = await appointmentModel.find({ agentId })

        res.json({ success: true, appointments })


    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

// API to mark appointment completed for Agent panel
const appointmentComplete = async (req, res) => {
    try {

        const { agentId, appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.agentId === agentId) {

            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            return res.json({ success: true, message: 'Appointment Completed' })

        } else {
            return res.json({ success: false, message: 'Mark Failed' })
        }
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

// API to cancel appointment for Agent panel
const appointmentCancel = async (req, res) => {
    try {

        const { agentId, appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.agentId === agentId) {

            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
            return res.json({ success: true, message: 'Appointment Cancelled' })

        } else {
            return res.json({ success: false, message: 'Cancallation Failed' })
        }
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}


// API to get dashboard data for doctore panel
const agentDashboard = async (req, res) => {

    try {

        const { agentId } = req.body
        const appointments = await appointmentModel.find({ agentId })

        let earnings = 0

        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        let customers = []

        appointments.map((item) => {
            if (!customers.includes(item.userId)) {
                customers.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            appointments: appointments.length,
            customers: customers.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }

}


// API to gt agent profile for agent panel

const agentPrfile = async (req, res) => {

    try {

        const { agentId } = req.body
        const profileData = await agentModel.findById(agentId).select('-password')

        res.json({ success: true, profileData })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }

}

// API to update agent profile data from Agent Panel

const updateAgentProfile = async (req, res) => {

    try {
        // name about update madbeku ell const olage name about add madi agent profile alli ero update profilanallirodanna un comment madbeku

        const { agentId, fees, address, available, name, about } = req.body

        await agentModel.findByIdAndUpdate(agentId, { fees, address, available })

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }

}


export {
    changeAvailability,
    agentList,
    loginAgent,
    appointmentsAgent,
    appointmentComplete,
    appointmentCancel,
    agentDashboard,
    agentPrfile,
    updateAgentProfile,
}