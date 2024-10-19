import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken'

const addUser = asyncHandler(async(req,res)=>{
    const {name,phone,companyName,companyEmail,employeeSize} = req.body

    if(!(name && phone && companyName && companyEmail && employeeSize)){
        throw new ApiError(400, "All fields are required")
    }

    const newUser = await User.findOne({phone:phone})

    const options = {
        httpOnly: true,
        secure: true
    }


    if(newUser){
        return res
                .status(200)
                .cookie("accessToken",newUser?.accessToken,options)
                .json(new ApiResponse(200,newUser,"User exists"))
    }

    const accessToken = jwt.sign(
        {
            name:name,
            phone: phone,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )

    const actualUser = await User.create({
        name,
        phone,
        companyName,
        companyEmail,
        employeeSize,
        accessToken:accessToken,
    })

    if(!actualUser){
        throw new ApiError(500, "Error in creating user")
    }

    return res
            .status(200)
            .cookie("accessToken",actualUser?.acessToken,options)
            .json(new ApiResponse(200,actualUser,"New User created"))

})


export {
    addUser
}