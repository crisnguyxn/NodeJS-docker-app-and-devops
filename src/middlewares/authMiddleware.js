const { handleCustomError } = require("../errors/custom-error");
const jwt = require('jsonwebtoken')
const authMiddleware = (req,res,next) => {
    console.log(req.headers);
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return next(handleCustomError('No token provided',401))
    }else{
        const token = authHeader.split(' ')[1]
        const {email,id} = jwt.verify(token,process.env.JWT_SECRET)
        req.user = {email,id}
        next()
    }
}

module.exports = authMiddleware