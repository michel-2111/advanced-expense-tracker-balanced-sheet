const express = require('express')
const router = express.Router()
const { register, login, getAllUsers, updateUser, deleteUser } = require('../controllers/authController')

router.get('/', getAllUsers)
router.post('/login', login)
router.post('/register', register)
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router