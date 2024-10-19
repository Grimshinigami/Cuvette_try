import mongoose from "mongoose";

const mobileOtpSchema = new mongoose.Schema(
    {
        number:{
            type:String,
            required:true
        },
        otp:{
            type:String,
            required:true,
        },
        createdAt: {
            type:Date,
            required:true
        },
        expiresAt: {
            type:Date,
            required:true
        },
    },
)

export const mOTP = mongoose.model("MobileOTP", mobileOtpSchema)