class CustomAPIError extends Error{
    constructor(msg,statusCode){
        super(msg),
        this.statusCode = statusCode
    }
}

const handleCustomError = (msg,statusCode) => {
    return new CustomAPIError(msg,statusCode)
}

module.exports = {CustomAPIError,handleCustomError}