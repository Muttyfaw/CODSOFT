const mongoose = require("mongoose");


const jobSchema = new mongoose.Schema({
    jobTitle:{
        type: String,
        required: [true, "Jobname is required"],
        trim: true
    },

    companyName: {
        type: String,
        required: [true, "Jobname is required"],
        trim: true
    },

    jobType: {
        type: String,
        required: [true, "Jobname is required"],
        trim: true
    },

   
    description:{
        type: String,
        required: [true, "Job description is required"],
        trim: true
    },

    requirement: {
        type: String,
        required: [true, "Job description is required"],
        trim: true
    },

    salary: {
        currency: {type: String, required: true, code: ["GBP", "GHS", "USD", "other"] },
        amount: {type: Number, required: true}
    },

})

module.exports = mongoose.model("Job", jobSchema);