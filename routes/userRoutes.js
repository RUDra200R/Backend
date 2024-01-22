const express = require('express')

const router = express.Router()

const {signup} = require('../controllers/usercontroller')

router.route('/signup').post(signup)


module.exports = router