import AppError from '../utils/AppError.js';
import MSG from '../constant/message.constant.js';

const handleCastError = error => {
    const message = `Invalid ${error.path}: ${error.value}.`;
    return new AppError(message, 400);
}

const handleDuplicateField = error => {
    const value = error.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/);
    const message = `Duplicate field value: ${value[0]}. Please use another value.`;
    return new AppError(message, 400);
}

const handleValidationError = error => {
    const err = Object.value(err.errors).map(e => e.message);
    const message = `Invalid input fields. ${err.join('. ')}.`
    return new AppError(message, 400);
}

const handleJWTError = error => new AppError(MSG.INVALID_TOKEN, 401);

const handleJWTExpiredError = error => new AppError(MSG.TOKEN_EXPIRED, 401);

const sendError = (err, req, res) => {

    if (err.isOperational) {
        return res.status(err.statusCode).json({
            message: err.message
        });
    }

    // system error
    console.log('ERROR: ', err);
    return res.status(500).json({
        message: MSG.SERVER_ERROR
    });

}

export default (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = error.status || 'error';

    let error = { ...err };
    error.message = err.message;

    if (err.name === 'CastError') error = handleCastError(error);
    if (err.code === 11000) error = handleDuplicateField(error);
    if (err.name === 'ValidationError') error = handleValidationError(error);
    if (err.name === 'JsonWebTokenError') error = handleJWTError(error);
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError(error);

    sendError(error, req, res);
}