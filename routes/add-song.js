const router = require('express').Router()
const controller = require('../controllers/controller')

router.post('/add-song', controller.addSong)
router.post('/admin-login', (req,res)=>{
    console.log(req.body);
    (req.body.inputValue === 'P@ss') ? res.json({authenticated: true}) : res.json({authenticated: false})
})



module.exports = router