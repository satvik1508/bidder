const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const createItem  = require('../controller/itemController'); 
const authenticateUser = require('../middleware/authentication');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
    
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Route to handle item creation with image upload
router.post('/items',authenticateUser ,upload.single('image'), createItem);

module.exports = router;