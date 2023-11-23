const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const jwtSecret = process.env.JWTSECRET;


//check if user is authenticated
exports.isAuthenticated = async(req, res, next)=>{
    const { token } = req.cookies;
    
    if(!token){
      return next(new ErrorResponse("Unauthorised access to this route", 401))
    }
    
    //verify token
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = await User.findById(decoded.id);
        next()

    } catch (err) {
        return next(new ErrorResponse("Unauthorised access to this route", 401))
    }

}