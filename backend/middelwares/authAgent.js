
import jwt from "jsonwebtoken";

//User authentication middleware

const authAgent = async (req, res, next) => {
    try {

        const { stoken } = req.headers
        if (!stoken) {
            return res.json({ success: false, message: "Not Authorized. Login Again " })
        }
        const token_decode = jwt.verify(stoken, process.env.JWT_SECRET)
        req.body.agentId = token_decode.id

        next()

    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message });
    }
}

export default authAgent