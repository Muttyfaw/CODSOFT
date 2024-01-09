const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWTSECRET;


const jobHistorySchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        maxlength: 30
    },

    companyName: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
    
    description: {
        type: String,
        trim: true
    },

    requirement: {
        type: String,
        trim: true,
        maxlength: 100
    },

    salary: {
        currency: { type: String, required: true, code: ["GBP", "GHS", "USD", "other"] },
        amount: { type: Number, required: true }
    },

    location: {
        type: String,
    },

    interviewDate: {
        type: Date,
    },

    applicationStatus: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }

}, { timestamps: true })


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

    jobHistory: [jobHistorySchema],

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

