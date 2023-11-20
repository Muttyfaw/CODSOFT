const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, "First name is required"],
        maxlength: 30
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        maxlength: 30
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"]
    },
    password:{
        type: String,
        required: [true, "password is required"],
        minlength: [6, "password must have at least (6) characters"] 
    },
    role:{
        type: Number,
        default: 0
    }
}, { timestamp: true });


//encrypt password before saving
userSchema.pre("save", async function (next){
   if (!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password, 12)
})


module.exports = mongoose.model("User", userSchema);