import mongoose from "mongoose";
import { OTP } from "../models/otp.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateOTP } from "../utils/otpGenerator.js";
import { sendMail } from "../utils/sendEmail.js";
import bcrypt from 'bcrypt'

const sendOtp = asyncHandler(async (req,res) =>{
    const {email,subject,message,duration=1} = req.body

    if(!(email && subject && message)){
        throw new ApiError(400, "All fields required")
    }

    console.log(email);
    

    await OTP.deleteOne({email:email})

    const generatedOTP = await generateOTP()

    const mailoptions = {
        from:process.env.SENDER_EMAIL,
        to:email,
        subject,
        html: `<p>${message}</p><p style="color:tomato;font-size:25px;
        letter-spacing:2px"><b>${generatedOTP.otp}</b></p>
        <p>This code expires in ${duration} hour</p>
        `
    };

    console.log(generatedOTP.otp);
    

    const hashedOTP = await bcrypt.hash(generatedOTP.otp,10)

    if(!hashedOTP){
        throw new ApiError(500, "Cannot hash otp")
    }

    const newotp = await OTP.create({
        email:email,
        otp:hashedOTP,
        createdAt: Date.now(),
        expiresAt: Date.now() + 3600000 *+duration,
    })

    if(!newotp){
        throw new ApiError(500, "Error in creating OTP");
    }

    await sendMail(mailoptions)

    return res
            .status(200)
            .json(new ApiResponse(200,newotp,"Created OTP successfully"))
            
})

const verifyOtp = asyncHandler( async (req,res) =>{
    const {email, otp} = req.body

    console.log(email,otp)

    if(!(email && otp)){
        throw new ApiError(400,"All fields are required")
    }

    const foundOTP = await OTP.findOne({email})

    // console.log(foundOTP);
    
    if(!foundOTP){
        throw new ApiError(400, "No OTP found")
    }

    const {expiresAt: isValid} = foundOTP

    // if(isValid < Date.now()){
    //     await OTP.deleteOne({email})
    //     throw new ApiError(400, "Expired Token")
    // }

    const {otp: otpvalue} = foundOTP

    // console.log(otpvalue);

    const isCorrect = await bcrypt.compare(otp,otpvalue);

    // console.log("Otp is: ",isCorrect);

    if(!isCorrect){
        throw new ApiError(400  ,"Wrong OTP")
    }

    return res
            .status(200)
            .json(new ApiResponse(200,{},"OTP is verified"))

})

export {
    sendOtp,
    verifyOtp
}