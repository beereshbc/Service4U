import express from 'express'
import { getProfile, loginUser, registerUser, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazorpay, verifyRazorpay} from '../controllers/userController.js'
import authUser from '../middelwares/authUser.js'
import upload from '../middelwares/multer.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)


userRouter.get('/get-profile', authUser, getProfile)
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile)
userRouter.post('/book-appointment', authUser, bookAppointment)
userRouter.get('/appointments', authUser, listAppointment)
userRouter.post('/cancel-appointment', authUser, cancelAppointment)
userRouter.post('/payment-razorpay', authUser, paymentRazorpay)
userRouter.post('/verifyRazorpay', authUser, verifyRazorpay)










export default userRouter











{/* <select
          onChange={(e) => setCityData(e.target.value)}
          value={cityData}
          id="city-select"
        >
          <option value="Bagalkot">Bagalkot</option>
          <option value="Bengaluru Urban">Bengaluru Urban</option>
          <option value="Bengaluru Rural">Bengaluru Rural</option>
          <option value="Belagavi">Belagavi</option>
          <option value="Ballari">Ballari</option>
          <option value="Bidar">Bidar</option>
          <option value="Vijayapur">Vijayapur</option>
          <option value="Chamarajanagar">Chamarajanagar</option>
          <option value="Chikballapur">Chikballapur</option>
          <option value="Chikkamagaluru">Chikkamagaluru</option>
          <option value="Chitradurga">Chitradurga</option>
          <option value="Dakshina Kannada">Dakshina Kannada</option>
          <option value="Davanagere">Davanagere</option>
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
        <button onClick={cityFilt} className="py-1 px-3 border rounded text-sm transition-all">Search</button>
      </div> */}