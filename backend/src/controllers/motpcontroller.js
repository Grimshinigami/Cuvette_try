import mongoose from "mongoose";
import { mOTP } from "../models/mobileotp.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateOTP } from "../utils/otpGenerator.js";
import { sendMssg } from "../utils/sendMessage.js";
import bcrypt from 'bcrypt'

const sendmOtp = asyncHandler(async (req,res) =>{
    const {number,message,duration=1} = req.body

    if(!(number && message)){
        throw new ApiError(400, "All fields required")
    }

    console.log(number);
    

    await mOTP.deleteOne({number:number})

    const generatedOTP = await generateOTP()

    const numbermssg = {
        message:message+generatedOTP.otp,
        number:number
    };

    console.log(generatedOTP.otp);
    

    const hashedOTP = await bcrypt.hash(generatedOTP.otp,10)

    if(!hashedOTP){
        throw new ApiError(500, "Cannot hash otp")
    }

    const newotp = await mOTP.create({
        number:number,
        otp:hashedOTP,
        createdAt: Date.now(),
        expiresAt: Date.now() + 3600000 *+duration,
    })

    if(!newotp){
        throw new ApiError(500, "Error in creating OTP");
    }

    await sendMssg(numbermssg)

    return res
            .status(200)
            .json(new ApiResponse(200,newotp,"Created OTP successfully"))
            
})

const verifymOtp = asyncHandler( async (req,res) =>{
    const {number, otp} = req.body

    if(!(number && otp)){
        throw new ApiError(400,"All fields are required")
    }

    const foundOTP = await mOTP.findOne({number})

    // console.log(foundOTP);
    
    if(!foundOTP){
        throw new ApiError(400, "No OTP found")
    }

    const {expiresAt: isValid} = foundOTP

    if(isValid < Date.now()){
        await mOTP.deleteOne({email})
        throw new ApiError(400, "Expired Token")
    }

    const {otp: otpvalue} = foundOTP

    // console.log(otpvalue);

    const isCorrect = await bcrypt.compare(otp,otpvalue);

    // console.log("Otp is: ",isCorrect);

    if(!isCorrect){
        throw new ApiError(404,"Wrong OTP")
    }

    return res
            .status(200)
            .json(new ApiResponse(200,{},"OTP is verified"))

})

export {
    sendmOtp,
    verifymOtp
}