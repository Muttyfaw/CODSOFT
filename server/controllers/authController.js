
const User = require("../models/userModel")
const errorHandler = require("../utils/errorHandler")


exports.signup = async (req, res, next) => {
   const {email} = req.body;
   const existingUser = await User.findOne({email})

   if (existingUser){
    return next(new errorHandler("This e-mail has been used"))
   }
   try{
    const user = await User.create(req.body)
    res.status(201).json({
        success: true,
        user
    })
   }catch(err){
      next(err)
   }
};

// exports.signin = (req, res) => {
//     res.send("This is the signin route")
// };
// exports.logout = (req, res) => {
//     res.send("This is the logout route")
// }; 