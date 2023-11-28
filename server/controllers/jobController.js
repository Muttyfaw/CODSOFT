const Job = require("../models/jobModel");
const ErrorResponse = require("../utils/errorResponse")

exports.createJob = async (req, res, next) => {

    try {
        const job = await Job.create({
            title: req.body.title,
            companyName: req.body.companyName,
            jobType: req.body.jobType,
            description: req.body.description,
            requirement: req.body.requirement,
            salary: req.body.salary,
            location: req.body.location,    
        })
        res.status(201).json({
            success: true,
            job
        })
    } catch (error) {
        return next(error)
    }
}




//single job
exports.singleJob = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id);
        res.status(200).json({
            success: true,
            job
        })
    } catch (error) {
        next(error);
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