const { handleCustomError } = require("../errors/custom-error");
const asyncWrapper = require("../middlewares/async");
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const login = asyncWrapper(async(req,res,next) => {
    const {email,password} = req.body
    const registeredUser = await User.findOne({email})
    if(!registeredUser){
      return next(handleCustomError('Email or password is not correctly',401))  
    }else{
        const isAuthencated = await bcrypt.compare(password,registeredUser.password);
        if(isAuthencated){
            const token = jwt.sign({id:registeredUser._id,email:registeredUser.email},process.env.JWT_SECRET,{
                expiresIn:24*60*60*1000
            })
            res.status(200).json({
                registeredUser,
                token
            })
        }else{
            return next(handleCustomError('Email or password is not correctly',401))
        } 
    }    
})

const register = asyncWrapper(async(req,res,next) => {
    const {email,name,password} = req.body
    const currentUser = await User.findOne({email})
    if(!currentUser){
        const salt = await bcrypt.genSalt()
        this.password = await bcrypt.hash(password,salt)
        const newUser = await User.create({
            name,
            email,
            password:this.password
        })
        res.status(201).json({newUser})    
    }else{
        return next(handleCustomError('Email is already taken',401))
    }
})

module.exports = {
    login,register
}