const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWTSECRET



const userSchema = new mongoose.Schema({

    firstName:{
        type: String,
        trim: true,
        required: [true, "First name is required"],
        maxlength: 30
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, "Last name is required"],
        maxlength: 30
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
    role:{
        type: Number,
        default: 0
    }
}, { timestamps: true });


//encrypt password before saving
userSchema.pre("save", async function (next){
   if (!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password, 12)
})

//compare password
userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

//return jwt token
userSchema.methods.jwtToken = function(){
    return jwt.sign({id: this.id}, jwtSecret,{
        expiresIn: 3600
    })
}

module.exports =  mongoose.model("User", userSchema);

