const Job = require("../models/jobModel");
const ErrorResponse = require("../utils/errorResponse")


exports.createJob = async (req, res, next) => {

    try {
        const job = await Job.create({
            title: req.body.title,
            companyName: req.employer.id,
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


//jobslist
exports.jobsList = async (req, res, next) => {

    try {
        const jobs = await Job.find()
        res.status(201).json({
            success: true,
            jobs
        })
    } catch (error) {
        return next(error)
    }
}