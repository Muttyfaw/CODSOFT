const ErrorResponse = require("../utils/errorResponse")


const errorHandler = (err, req, res, next) => {
    let error = { ...err }
    error.message = err.message

    if (err.name === "CastError") {
        const message = `Resource missing ${err.value}`
        error = new ErrorResponse(message, 404)
    }

    // Mongo DB duplicate values
    if (err.code === 11000) {
        const message = "Duplicate value entered"
        error = new ErrorResponse(message, 400)
    }

    // Mongo DB validation error
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map(val => ' ' + val.message)
        error = new ErrorResponse(message, 400)
    }

    res.status(error.codeStatus || 500).json({
        success: false,
        error: error.message || "server error"
    })
}

module.exports = errorHandler