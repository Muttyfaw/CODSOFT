const Employer = require("../models/employerModel");
const ErrorResponse = require("../utils/errorResponse");


exports.employerSignup = async (req, res, next) => {
    const { email } = req.body;
    const existingEmployer = await Employer.findOne({ email })

    if (existingEmployer) {
        return next(new ErrorResponse("This e-mail has been used", 400))
    }
    try {
        const employer = await Employer.create(req.body)
        res.status(201).json({
            success: true,
            employer,
        })
    } catch (err) {
        next(err)
    }
};

exports.employerSignin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        //Validate credentials
        if (!email) {
            return next(new ErrorResponse("Kindly add an email", 403))
        }
        if (!password) {
            return next(new ErrorResponse("Kindly add a password", 403))
        }

        //Check email
        const employer = await Employer.findOne({ email })
        if (!employer) {
            return next(new ErrorResponse("Invalid credentials", 400))
        }

        //Compare password
        const existingPassword = await employer.comparePassword(password)
        if (!existingPassword) {
            return next(new ErrorResponse("Invalid credentials", 400))
        }
        tokenResponse(employer, 200, res);
    } catch (err) {
        next(err)
    }
};

const tokenResponse = async (employer, codeStatus, res) => {
    const token = await employer.jwtToken()
    res.status(codeStatus)
        .cookie("token", token, { maxAge: 60 * 60 * 1000, httpOnly: true })
        .json({ success: true, token, employer })
}


//Employer profile
exports.employerProfile = async (req, res, next) => {

    const employer = await Employer.findById(req.employer.id).select("-password")

    res.status(200).json({
        success: true,
        employer
    })
}



//logout
exports.logout = (req, res, next) => {
    res.clearCookie("token")
    res.status(200).json({
        success: true,
        message: "Sucessfully logged out"
    })
} 