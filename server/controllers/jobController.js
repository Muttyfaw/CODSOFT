const Job = require("../models/jobModel");
const ErrorResponse = require("../utils/errorResponse")


exports.createJob = async (req, res, next) => {

    try {
        const job = await Job.create({
            title: req.body.title,
            companyName: req.user.id,
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
        res.status(201).json({
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

//update job
exports.updateJob = async (req, res, next) => {

    try {
        const job = await Job.findByIdAndUpdate(req.params.job_id, req.body, { new: true })
        res.status(200).json({
            success: true,
            job
        })
    } catch (error) {
        return next(error)
    }
}

exports.allJobs = async (req, res, next) => {

    //search feature
    const keyword = req.query.keyword ? {
        title: {
            $regex: req.query.keyword,
            $options: "i"
        }
    } : {}


    //filter by category ids
    let categories = []
    const jobTypeCategory = await Job.find({jobType})
    jobTypeCategory.forEach(cat => {
        categories.push(cat.jobType)
    })

    // let jobType = [...new Set (jobTypes)]
    let cat = req.query.cat;
    let categFilter = cat !== '' ? cat : categories

  
    // let cat = req.query.cat
    

    //filter by location
    let locations = []
    const jobByLocation = await Job.find({}, {location: 1})
    jobByLocation.forEach(val =>{
    locations.push(val.location)
    })

    let setUniqueLocation = [...new Set(locations)]
    let location = req.query.location
    let locationFilter = location !== '' ? location : setUniqueLocation

    //set pagination
    const pageLength = 5;
    const page = Number(req.query.pageNumber) || 1
    // const count = await Job.find({}).estimatedDocumentCount()
    const count = await Job.find({...keyword, location: locationFilter, jobType: categFilter}).countDocuments()
    
   
    try {
        const jobs = await Job.find({ ...keyword, jobType: categFilter, location: locationFilter }).skip(pageLength * (page - 1)).limit(pageLength)
        console.log(jobs)
        res.status(200).json({
            success: true,
            jobs,
            page,
            pages: Math.ceil(count / pageLength),
            count,
            cat,
            setUniqueLocation,
            // setUniqueJobType
        })
        next()
    }
    catch (error) {
        return next(error)
    }
}

//delete job
exports.deleteJob = async (req, res, next) => {
    try {
        const job = await Job.findOneAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Job deleted successfully"
        })

    } catch (error) {
        next(new ErrorResponse("Server Error", 500))
    }
}
