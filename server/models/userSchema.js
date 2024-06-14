const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true,'Please provide a username'],
        unique: true,
    },
    email:{
        type: String,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],
          unique: true,
    },
    password:{
        type: String,
        required: [true,'Please provide a password'],
    },
    role:{
        type: String,
        enum: ['admin','user'],
        default: 'user',
    }
},
{timestamps: true}
)

userSchema.pre('save' , async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
})

userSchema.methods.createJWT = function (){
    return jwt.sign({userId:this._id,name:this.name},process.env.JWT_SECRET,
      {expiresIn: process.env.JWT_LIFETIME})
}

userSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword,this.password)
    return isMatch
}



module.exports = mongoose.model('User', userSchema);

