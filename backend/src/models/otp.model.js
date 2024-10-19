import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            unique:true,
        },
        otp:{
            type: String,
        },
        createdAt: {
            type:Date,
            required:true
        },
        expiresAt: {
            type:Date,
            required:true
        }
    }
)

export const OTP = mongoose.model("Otp",otpSchema)