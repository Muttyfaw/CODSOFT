const Job = require("../models/jobModel");
const ErrorResponse = require("../utils/errorResponse")

exports.jobDetail = async (req, res, next)=>{

    try {
        const job = await Job.createCollection(req.body)

        if (!job) {
            return new ErrorResponse("You need to create a job", 400)
        }
        res.status(200).json({
            success: true,
            job
        })
    } catch (error) {
        return next(error)
    }
}