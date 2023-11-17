require("dotenv").config()
const express = require('express')
const app = express()
const port = process.env.PORT 
const mongoose = require("mongoose")



mongoose.connect(process.env.DATABASE,{
    serverSelectionTimeoutMS: 5000
}).then(()=>console.log("Sucessfully connected to DB"))

app.route('/')

.get((req, res)=>{
    req.send ()
})

app.listen(port , ()=>{
    console.log("Server has started on port", port)
    
})
 
 