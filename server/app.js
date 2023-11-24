require("dotenv").config()
const express = require('express')
const app = express()
const port = process.env.PORT 
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const errorHandler = require("./middlewares/error")

//Imports
const authRoutes = require("./routes/authRoutes")
const userRoute = require("./routes/userRoute")

//Database
mongoose.connect(process.env.DATABASE, { 
    serverSelectionTimeoutMS: 5000
})
.then(()=>
console.log("Sucessfully connected to DB"
))
.catch(err =>{
    Error.captureStackTrace(err)
})


//middleware
app.use(express.json())
app.use(bodyParser.urlencoded(
    {extended:true,
     limit: "5mb"
}))
app.use(bodyParser.json({limit: "5mb"}))
app.use(cors())
app.use(errorHandler)
app.use(cookieParser())


app.listen(port, () => {
    console.log("Server has started on port", port)
})

//Routes
// app.get("/", (req, res) =>{
//     res.send ("Hello from this side")
// })
app.use("/api", authRoutes)
app.use("/api", userRoute)


