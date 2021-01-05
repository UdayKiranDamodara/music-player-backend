const router = require('express').Router()
const controller = require('../controllers/controller')

router.get('/', controller.home)
router.get('/search/:searchInput', controller.search)
router.get('/album/:albumName', controller.album)
router.get('/artist/:artistName', controller.artist)

module.exports = router