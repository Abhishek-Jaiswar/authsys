import jwt from 'jsonwebtoken';

export default function handleGoogleAuthCallback(req, res) {
  try {
    console.log("Google Auth Callback - User:", req.user);
    
    if (!req.user) {
      console.error("No user found in request");
      return res.status(400).redirect("http://localhost:5173/login?error=no_user");
    }

    const payload = {
      id: req.user._id,
      email: req.user.email,
      fullname: req.user.fullname,
    };

    console.log("Creating JWT for user:", payload);

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, { 
      httpOnly: true, 
      sameSite: "Lax",
      secure: process.env.NODE_ENV === 'production' ? true : false,
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    console.log("Redirecting to frontend with token");
    res.redirect("http://localhost:5173/auth/callback");
  } catch (error) {
    console.error("Google Auth Callback Error:", error);
    return res.status(500).redirect("http://localhost:5173/login?error=auth_failed");
  }
}
