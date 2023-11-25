const Job = require("../models/jobModel");
const ErrorResponse = require("../utils/errorResponse")

exports.jobDetail = async (req, res, next)=>{

    try {
        const job = new Job(req.body)
        job.save()

        if (!job) {
            return next(new ErrorResponse("You need to create a job", 400))
        }
        res.status(201).json({
            success: true,
            job
        })
    } catch (error) {
        return next(error)
    }
}

// exports.jobList = async (req, res, next) => {

//     try {
//         const jobs = await Job.find().sort({createdAt: -1})

//         if (!job) {
//             return next(new ErrorResponse("You need to create a job", 400))
//         }
//         res.status(201).json({
//             success: true,
//             jobs
//         })
//     } catch (error) {
//         return next(error)
//     }
// }