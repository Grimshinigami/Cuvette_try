import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Job} from '../models/job.model.js'
import { User } from "../models/user.model.js";

const addJob = asyncHandler(async(req,res) => {

    const {jobTitle, jobDescription, experienceLevel,candidates, endDate} = req.body

    if(!(jobTitle&& jobDescription&& experienceLevel&&candidates&& endDate)){
        throw new ApiError(400, "All fields are required")
    }

    const checkExists = await Job.findOne({jobTitle:jobTitle})

    if(checkExists){
        throw new ApiError(400, "Job Title already exists")
    }

    const user = req.user

    console.log(user?.phone);
    

    const currentUser = await User.findOne({phone:user?.phone})

    const newJob = await Job.create({
        company:currentUser?._id,
        jobTitle,
        jobDescription,
        experienceLevel,
        candidates,
        endDate
    })

    if(!newJob){
        throw new ApiError(500,"Error in creating Job")
    }

    // console.log(newJob);
    

    return res
            .status(200)
            .json(new ApiResponse(200,newJob,"New Job created for user"))

})

export {
    addJob
}