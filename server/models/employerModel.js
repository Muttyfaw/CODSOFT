const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWTSECRET

const employerSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: [true, "Kindly include the company's name"]
    },
       email: {
        type: String,
        trim: true,
        required: [true, "Email is required"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"]
    },
    password:{
        type: String,
        trim: true,
        required: [true, "password is required"],
        minlength: [6, "password must have at least (6) characters"]
    },

    industry: {
        type: String,
        required: [true, "Kindly include the company's name"]
    },

    location: {
        city: String,
        state: String,
    },

    contact: {
        type: Number,
        min: 9
    },

    website: String
})

//encrypt password before saving
employerSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 12)
})

//compare password
employerSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

//return jwt token
employerSchema.methods.jwtToken = function () {
    return jwt.sign({ id: this.id }, jwtSecret, {
        expiresIn: 3600
    })
}

module.exports = mongoose.model("Employer", employerSchema);