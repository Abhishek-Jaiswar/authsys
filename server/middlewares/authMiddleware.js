import JWT from 'jsonwebtoken'

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies?.token;
    if (!token && typeof token !== 'string') {
        return res.status(401).json({
            message: "Unauthorized: No valid token provided",
            success: false
        })
    }

    try {
        const decode = JWT.verify(token, process.env.JWT_SECRET);
        if (!decode.id || !decode.email) {
            return res.status(401).json({
                message: "Unauthorized: No valid token provided",
                success: false
            })
        }
        
        req.user = decode
        req.id = decode.id
        next()
    } catch (error) {
        console.error("Internal server error", error);
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
}