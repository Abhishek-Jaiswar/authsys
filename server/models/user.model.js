import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    }
}, { timestamps: true })

export const User = mongoose.model("User", userSchema)