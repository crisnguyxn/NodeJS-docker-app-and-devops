const { CustomAPIError } = require("../errors/custom-error")

const handleErrorMiddleware = (err,req,res,next) => {
    if(err instanceof CustomAPIError){
        res.status(err.statusCode).json({msg:err.message})
    }
    res.status(500).json({msg:'Something wrent wrong,try again later'})
}

module.exports = handleErrorMiddleware