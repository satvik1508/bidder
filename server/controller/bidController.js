const Item = require('../models/itemSchema');

const bidcontroller = async(req,res) => {
    try {
        const {itemId} = req.params;
        const {bidAmount} = req.body;
        const userId = req.userId;

        const item = await Item.findById(itemId);

        if(!item){
            return res.status(404).json({message: 'Item not found'});
        }

        if(bidAmount <= item.currentPrice){
            return res.status(400).json({message: 'Bid amount should be greater than current price'});
        }

        item.currentPrice = bidAmount;
        item.currentBidder = userId;

        await item.save();
        res.status(200).json({message: 'Bid placed successfully', item});

    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = bidcontroller;
