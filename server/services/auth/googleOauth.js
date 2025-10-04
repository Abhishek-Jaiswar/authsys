import { Strategy } from 'passport-google-oauth20';
import { User } from '../../models/user.model.js';
import { config } from 'dotenv'
config()

export const googleOauth = (passport) => {
    passport.use(new Strategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
        async (profile, done) => {
            try {
                let user = await User.findOne({
                    $or: [{ googleId: profile.id }, { email: profile.emails[0].value }]
                });

                if (user) {
                    if (!user.googleId) {
                        user.googleId = profile.id;
                        user.profilePicture = profile.photos?.[0]?.value || user.profilePicture;
                        await user.save();
                    }
                    return done(null, user);
                }

                user = new User({
                    googleId: profile.id,
                    fullname: profile.displayName || 'Unknown',
                    email: profile.emails[0].value,
                    profilePicture: profile.photos?.[0]?.value || null
                });

                await user.save();
                return done(null, user);
            } catch (error) {
                console.error('Google OAuth Error:', error);
                return done(error);
            }
        }));
};