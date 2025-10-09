import express from 'express'
import { login, logout, register } from '../controllers/user.controller.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { User } from '../models/user.model.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', authMiddleware, logout)

router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.id).select('-password -__v');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

export default router