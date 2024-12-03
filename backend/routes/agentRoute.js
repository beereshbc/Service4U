import express from 'express'
import { agentDashboard, agentList, agentPrfile, appointmentCancel, appointmentComplete, appointmentsAgent, loginAgent, updateAgentProfile } from '../controllers/agentController.js'
import authAgent from '../middelwares/authAgent.js'

const agentRouter = express.Router()

agentRouter.get('/list', agentList)
agentRouter.post('/login', loginAgent)
agentRouter.get('/appointments', authAgent, appointmentsAgent )
agentRouter.post('/complete-appointment', authAgent, appointmentComplete)
agentRouter.post('/cancel-appointment', authAgent, appointmentCancel)
agentRouter.get('/dashboard', authAgent, agentDashboard)
agentRouter.get('/profile', authAgent, agentPrfile)
agentRouter.post('/update-profile', authAgent, updateAgentProfile)


export default agentRouter