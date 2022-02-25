const { Router } = require('express')
const router = Router()
const {createUser,getAllUser} = require('../controllers/user')

router.post('/', createUser)
router.get('/', getAllUser)

module.exports = router