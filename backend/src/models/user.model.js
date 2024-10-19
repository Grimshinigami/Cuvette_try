import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required:true
        },
        phone: {
            type: String,
            required:true
        },
        companyName: {
            type: String,
            required:true
        },
        companyEmail: {
            type: String,
            required:true
        },
        employeeSize: {
            type: String,
            required:true
        },
        accessToken: {
            type:String,
        }

    },
    {timestamps:true}
)

export const User = mongoose.model('User',userSchema)