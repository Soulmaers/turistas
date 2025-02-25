const express = require('express')
const router = express.Router()
const controllers = require('../controllers/controllers')

module.exports = router

router.post('/api/addTournaments', controllers.addTournament)
router.post('/api/user/check', controllers.getUserCheck)
router.post('/api/deleteTour', controllers.deleteTour)
router.post('/api/getContentTour', controllers.getContentTour)
router.get('/api/getContent', controllers.getContent)
router.post('/api/setCatch', controllers.setCatch)
router.post('/api/getCatchs', controllers.getCatchs)
router.post('/api/getStatusUser', controllers.getStatusUser)
router.post('/api/getCatchsList', controllers.getCatchsList)

