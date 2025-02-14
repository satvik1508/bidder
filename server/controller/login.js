const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')
const {StatusCodes} = require('http-status-codes')

const loginController = async(req,res) => {

    const {email , password} = req.body
    if(!email || !password){
        return res.status(StatusCodes.BAD_REQUEST).send('Please provide Email and Password')
    }

    const user = await User.findOne({email})

    if(!user){
        return res.status(StatusCodes.UNAUTHORIZED).send('Invalid Credentials')
    }

    //compare password
    const isPassword = await user.comparePassword(password)

    if(!isPassword){
        return res.status(StatusCodes.UNAUTHORIZED).send('Invalid Credentials')
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({token,role:user.role})
}

module.exports = loginController