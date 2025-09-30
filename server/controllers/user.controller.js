import { validationRules } from "../libs/validationRules.js";
import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        const error = []

        if (!fullname) {
            error.push("Fullname is required ")
        } else if (!validationRules.fullname.regex.test(fullname)) {
            error.push(validationRules.fullname.message)
        }

        if (!email) {
            error.push("Email is required ")
        } else if (!validationRules.email.regex.test(email)) {
            error.push(validationRules.email.message)
        }

        if (!password) {
            error.push("Password is required ")
        } else if (!validationRules.password.regex.test(password)) {
            error.push(validationRules.password.message)
        }

        if (error.length > 0) {
            return res.status(400).json({
                message: "Validation failed",
                success: false,
                errors: error
            })
        }

        const user = await User.findOne({ email })
        if (user) {
            return res.status(409).json({
                message: "User with this email already exist",
                success: false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({
            fullname,
            email,
            password: hashedPassword
        })

        return res.status(201).json({
            message: "User registered successfully",
            success: true
        })
    } catch (error) {
        console.error("Failed to create user: ", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const error = []
        if (!email) {
            error.push("Email is required")
        } else if (!validationRules.email.regex.test(email)) {
            error.push(validationRules.email.message)
        }

        if (!password) {
            error.push("Password is required")
        } else if (!validationRules.password.regex.test(password)) {
            error.push(validationRules.password.message)
        }

        if (error.length > 0) {
            return res.status(403).json({
                message: "Validation failed",
                success: false,
                error: error
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User with this email not found.",
                success: false
            })
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password)
        if (!isPasswordMatched) {
            return res.status(401).json({
                message: "Invalid password",
                success: false
            })
        }

        const token = JWT.sign({
            id: user._id,
            email: user.email
        },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
            secure: process.env.NODE_ENV !== "development",
            maxAge: 7 * 24 * 60 * 60 * 1000

        })

        return res.status(200).json({
            message: "Successfully logged in",
            message: true,
            user: {
                username: user.fullname,
                id: user._id,
                email: user.email
            }
        })

    } catch (error) {
        console.error("Failed to login", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

export const logout = async (req, res) => {
    try {
        if (!req.cookies?.token) {
            return res.status(200).json({
                message: "No active session found",
                success: false,
            });
        }

        res.clearCookie("token", {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
            secure: process.env.NODE_ENV !== "development",
            path: "/",
        });

        return res.status(200).json({
            message: "Logged out successfully",
            success: true,
        });
    } catch (error) {
        console.error("Failed to logout: ", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};
