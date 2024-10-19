import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        company:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        jobTitle: {
            type:String,
            required:true
        },
        jobDescription: {
            type:String,
            required:true
        },
        experienceLevel: {
            type:String,
            required:true
        },
        candidates: [{
            type:String,
            required:true
        }],
        endDate: {
            type:String,
            required:true
        }
    },
    {timestamps:true}
)

export const Job = mongoose.model("Job", jobSchema)