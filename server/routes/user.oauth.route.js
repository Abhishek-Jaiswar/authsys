import express from 'express'
import passport from 'passport'
import handleGoogleAuthCallback from '../controllers/user.googleAuth.js'

const router = express.Router()

router.get('/auth/google', passport.authenticate("google", {
    scope: ["profile", "email"]
}))
router.get('/auth/google/callback', passport.authenticate("google", { failureRedirect: "/login" }), handleGoogleAuthCallback)

export default router