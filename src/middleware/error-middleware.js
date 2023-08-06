import { ResponseError } from "../error/response-error.js";

const errorMiddleware = async (err, req, res, next) => {
    if (err instanceof ResponseError) {
        if (!err) {
            return next();
        }

        let validationErrors = []
        if (err.hasOwnProperty('validation_errors')) {
            validationErrors = err.validation_errors;
        }

        res.status(err.status).json({
            message: err.message,
            validation_errors: validationErrors,
            stack: process.env.APP_ENV === 'development' ? err.stack : ''
        });
    } else {
        res.status(500).json({
            message: err.message,
            validation_errors: [],
            stack: process.env.APP_ENV === 'development' ? err.stack : ''
        });
    }
}

export {
    errorMiddleware
}