import { ApiError } from "./ApiError.js"

export const generateOTP = async() => {
    try {
        return {otp:`${Math.floor(1000 + Math.random() * 9000)}`}
    } catch (error) {
        throw new ApiError("Error in generating OTP: ",error)
    }
}