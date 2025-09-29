import express from 'express'
import { login, logout, register } from '../controllers/user.controller.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', authMiddleware, logout)

export default router