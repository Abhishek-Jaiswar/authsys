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
        required: function () {
            return !this.googleId; // Password required only if googleId is not set
        },
        minLength: 8,
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    }
}, { timestamps: true })

export const User = mongoose.model("User", userSchema)