import express from 'express';
import passport from 'passport';
import handleGoogleAuthCallback from '../controllers/user.googleAuth.js';

const router = express.Router();

router.get('/google', passport.authenticate("google", { scope: ["profile", "email"] }));
router.get('/google/callback',
    passport.authenticate("google", { failureRedirect: "/login", session: false }),
    handleGoogleAuthCallback
);

export default router;
