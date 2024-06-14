const User = require('../models/userSchema')
const {StatusCodes} = require('http-status-codes')

const registerController = async(req,res) => {

    try {
        const {username, email, password, role} = req.body;
        const user = await User.create({username, email, password, role})
        const token = user.createJWT()
        res.status(StatusCodes.CREATED).json({token})
        
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            error,
        })
    }
}

module.exports = registerController