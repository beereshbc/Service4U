import express from "express";
import { addAgent, allAgents, loginAdmin,appointmentsAdmin, appointmentCancel, adminDashboard } from "../controllers/adminController.js";
import upload from "../middelwares/multer.js";
import authAdmin from "../middelwares/authAdmin.js";
import { changeAvailability } from "../controllers/agentController.js";


const adminRouter = express.Router()

adminRouter.post('/add-agent',authAdmin, upload.single('image'), addAgent)
adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-agents',authAdmin, allAgents)
adminRouter.post('/change-availability',authAdmin, changeAvailability)
adminRouter.get('/appointments', authAdmin, appointmentsAdmin)
adminRouter.post('/cancel-appointment', authAdmin, appointmentCancel)
adminRouter.get('/dashboard', authAdmin, adminDashboard)


adminRouter.get('/login', (req, res) => res.send("Hello world"))

export default adminRouter