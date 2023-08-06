class ResponseError extends Error {

    constructor (status, message, details = {}) {
        super(message);
        this.status = status;
        this.validation_errors = {}

        if (details.hasOwnProperty('validation_errors')) {
            this.validation_errors = details.validation_errors.map((item) => {
                return {
                    message: item.message,
                    context: item.context
                }
            });
        }
    }
}

export {
    ResponseError
}