export default function handleGoogleAuthCallback(req, res) {
    const token = jwt.sign(req.user, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.cookie("token", token, { httpOnly: true });
    res.redirect("http://localhost:5173/"); // frontend route
}