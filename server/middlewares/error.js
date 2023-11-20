const ErrorHandler = require("../utils/errorHandler")

const errorHandler =(err, res, req, next) =>{
    let error = {...err}
    error.message = err.message

    if(err.name == "CastError"){
        const message = `Resource missing ${err.value}`
        error = new ErrorHandler(message, 404 )
    }

    // Mongo DB duplicate values
    if (err.code === 11000) {
        const message = "Duplicate value entered"
        error = new ErrorHandler(message, 400)
    }

    // Mongo DB validation error
    if (err.name === "ValidationError") {
        const message = Object.value(err.errors).map(value => '' + value.message)
        error = new ErrorHandler(message, 400)
    }

    res.status(errorr.statusCode || 500).json({
        success: false,
        error: error.message || "server-error"
    })
}

module.exports = errorHandler