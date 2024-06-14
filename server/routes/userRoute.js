const express = require('express')
const router = express.Router()

const loginController = require('../controller/login')
const registerController = require('../controller/register')

router.route('/login').post(loginController)
router.route('/register').post(registerController)

module.exports = router