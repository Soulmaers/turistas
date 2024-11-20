const express = require('express')
const router = express.Router()
const controllers = require('../controllers/controllers')

module.exports = router
router.get('/api/user/check/:contactID', controllers.getUserCheck)