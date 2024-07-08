const express = require('express')
const router = express.Router()

const Item = require('../models/itemSchema')

router.get('/items', async (req, res) => {
  try {
    const items = await Item.find()
    res.status(200).json(items)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router