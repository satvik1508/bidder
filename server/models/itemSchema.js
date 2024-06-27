const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    productName:{
        type: String,
        required: [true,'Please provide a name'],
    },

    description:{
        type: String,
        required: [true,'Please provide a description'],
    },

    startingPrice:{
        type: Number,
        required: [true,'Please provide a starting price'],
    },

    currentPrice:{
        type: Number,
        default: 0,
    },

    image:{
        type: String,
        required: [true,'Please provide an image'],
    },

    // endTime:{
    //     type: Date,
    //     required: [true,'Please provide an end time'],
    // },
},
{timestamps: true}
)

module.exports = mongoose.model('Item',itemSchema)
