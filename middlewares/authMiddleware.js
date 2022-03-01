import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export default function authMiddleware (req, res, next) {
    let authHeader = req.headers.authorization
    let token

    if (authHeader) token = authHeader.split(' ')[1]
    if (token){
    try{
        jwt.verify(token, 'MYSECRET', async (err, decoded) => {
            if (!err) {
                const user = await User.findOne({email: decoded.email}) 
                req.authenticatedUser = user 
                next()
            }else{
                res.status(401).json({message: 'Invalid token'})
            }
        })
    }catch{} 
    }else{
        return res.status(401).json({message: "No token"})
    }      
}
