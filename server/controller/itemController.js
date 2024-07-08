const Item = require('../models/itemSchema'); // Adjust the path as needed

const createItem = async (req, res) => {
  try {
    const {productName, description, startingPrice } = req.body;
    // const image = req.file.path;
    const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`

    const item = new Item({
      user:req.userId,
      productName,
      description,
      startingPrice,
      currentPrice:startingPrice, 
      image: imageUrl,
    //endTime
    });

    await item.save();
    res.status(201).json(item);
    // console.log(item)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = createItem;