
const User = require("../models/userModel")
const ErrorResponse = require("../utils/errorResponse")


exports.signup = async (req, res, next) => {
    const { email } = req.body;
    const existingUser = await User.findOne({ email })

    if (existingUser) {
        return next(new ErrorResponse("This e-mail has been used", 400))
    }
    try {
        const user = await User.create(req.body)
        res.status(201).json({
            success: true,
            user,
        })
    } catch (err) {
        next(err)
    }
};

exports.signin = async (req, res, next) => {
    try {
        const {email, password} = req.body;
       //Validate credentials
        if(!email){
            return next(new ErrorResponse("Kindly add an email", 403))
        }
        if (!password) {
            return next(new ErrorResponse("Kindly add a password", 403))
        }

        //Check email
        const user = await User.findOne({email})
        if(!user){
            return next(new ErrorResponse("Invalid credentials", 400))
        }

        //Compare password
        const existingPassword = await user.comparePassword(password)
        if (!existingPassword) {
            return next(new ErrorResponse("Invalid credentials", 400))
        }
          tokenResponse(user, 200, res);
    } catch (err) {
        next(err)
    }
};

const tokenResponse = async (user, codeStatus, res)=>{
    const token = await user.jwtToken()
    res.status(codeStatus)
    .cookie("token", token, {maxAge: 60 * 60 * 1000, httpOnly: true })
    .json({ success: true, token, user})
}

//logout
exports.logout =(req, res, next)=>{
      res.clearCookie("token")
      res.status(200).json({
        success: true,
        message: "Sucessfully logged out"
      })
} 