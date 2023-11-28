const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");



const jobSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Jobname is required"],
        maxlength: 30
    },

    companyName: {
        type: ObjectId,
        ref: "Employer",
        required: [true, "Jobname is required"],
        trim: true
    },

    jobType: {
        type: String,
        required: [true, "Jobname is required"],
        trim: true
    },

    available: {
        type: Boolean,
        default: true
    },

    description:{
        type: String,
        required: [true, "Job description is required"],
        trim: true
    },

    requirement: {
        type: String,
        required: [true, "Job description is required"],
        trim: true,
        maxlength: 100
    },

    salary: {
        currency: {type: String, required: true, code: ["GBP", "GHS", "USD", "other"] },
        amount: {type: Number, required: true}
    }, 

    location: {
        type: String, 
       required: true
    }
    
},{ timestamps: true })

module.exports = mongoose.model("Job", jobSchema);