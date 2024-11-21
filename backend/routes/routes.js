const express = require('express')
const router = express.Router()
const controllers = require('../controllers/controllers')

module.exports = router
router.post('/api/user/check', controllers.getUserCheck)