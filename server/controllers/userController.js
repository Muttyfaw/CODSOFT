const User = require("../models/userModel");
const ErrorResponse = require("../utils/errorResponse");

exports.allUsers = async ( req, res, next) =>{
    //set page division
    const pageLength = 10
    const page = Number(req.body.pageNumber) || 1
    const count = await User.find({}).estimatedDocumentCount() 


    try {
        const users = await User.find().sort({createdAt: 1}).select(`-password`)
        .skip(pageLength * (page-1))
        .limit(pageLength)
        res.status(200).json({
            success: true,
            users,
            page,
            pages: Math.ceil(count / pageLength),
            count
        })
        next()
    } 
    catch (error) {
       return next(error)  
    }
}

exports.singleUser = async (req, res, next)=>{
   try {
      const user = await User.findById(req.param.id)
       res.status(200).json({
        success: true,
        user
       })
       next()
   } catch (error) {
      return next(error)
   }
}

exports.editUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.param.id, req.body, {new: true})
        res.status(200).json({
            success: true,
            user
        })
        next()
    } catch (error) {
        return next(error)
    }
}