import { asyncHandler } from "./asyncHandler.js"
import { ApiError } from "./ApiError.js"
import { User } from "../models/user.model.js"
import jwt from 'jsonwebtoken'

export const verifyJWT = asyncHandler( async(req, _, next) => {

    try {

        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")

        if(!token){
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        // console.log(decodedToken);
        
    
        const user = await User.findOne({phone:decodedToken?.phone})
    
        if(!user){
            throw new ApiError(404, "Invalid Access token")
        }
    
        req.user = user;
        next()
    
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token")
    }
})