import jwt from 'jsonwebtoken';

export default function handleGoogleAuthCallback(req, res) {
  const payload = {
    id: req.user._id,
    email: req.user.email,
    fullname: req.user.fullname,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

  res.cookie("token", token, { httpOnly: true, sameSite: "Lax" });
  res.redirect("http://localhost:5173/");
}
