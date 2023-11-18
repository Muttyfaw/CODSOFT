require("dotenv").config()
const express = require('express')
const app = express()
const port = process.env.PORT 
const mongoose = require("mongoose")
const bodyParser = require("body-parser")


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

const Jobs = new mongoose.Schema({
    jobName: String,
    location: String,
    salary: String,
})

//middleware
app.use(bodyParser.urlencoded(
    {extended:true,
     limit: "5mb"
}))

app.listen(port, () => {
    console.log("Server has started on port", port)

})

//Routes
app.get("/", (req, res) =>{
    res.send ("Hello from this side")
})



