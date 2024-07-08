const express = require('express');
const router = express.Router();
const bidController = require('../controller/bidController');
const authenticateUser = require('../middleware/authentication');

router.post('/:itemId', authenticateUser, bidController);

module.exports = router;