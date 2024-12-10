const express = require('express')
const router = express.Router()
const controllers = require('../controllers/controllers')

module.exports = router

router.post('/api/addTournaments', controllers.addTournament)
router.post('/api/user/check', controllers.getUserCheck)
router.post('/api/deleteTour', controllers.deleteTour)
router.post('/api/getContentTour', controllers.getContentTour)
