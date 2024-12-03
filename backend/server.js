import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import agentRouter from './routes/agentRoute.js';
import userRouter from './routes/userRoute.js';


//app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//middelwares
app.use(express.json())
app.use(cors())


//api endpoint
app.use('/api/admin',adminRouter)
//localhost:4000/api/admin/add-agent
app.use('/api/agent', agentRouter)
app.use('/api/user', userRouter)


app.get('/', (req, res)=>{
res.send("API is Working Great")
})


app.listen(port, ()=> console.log("server started", port))