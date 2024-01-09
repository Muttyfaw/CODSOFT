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

//delete user
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        res.status(200).json({
            success: true,
            message: "user deleted"
        })
        next();

    } catch (error) {
        return next(error);
    }
}

//delete user
exports.createJobHistory = async (req, res, next) => {
    const [title, description, salary, location] = req.body;
    try {
        const curentUser = await User.findOne({_id: req.user_id});
        if (!curentUser){
            return next(new ErrorResponse("You must be logged in", 401))
        }else{
            const addJobHistory ={
                title,
                description,
                salary,
                location,
                user: req.user._id
            }
            currentUser.jobsHistory.push(addJobHistory)
            await currentUser.save()
        }
        res.status(200).json({
            success: true,
            currentUser
        })
        next();

    } catch (error) {
        return next(error);
    }
}