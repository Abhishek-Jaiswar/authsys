import mongoose from 'mongoose'
import { config } from 'dotenv'
config()

const DATABASE_URI = process.env.MONGODB_URI

if (!DATABASE_URI) {
    throw new Error("MONGODB_URI environment variable is not defined!")
}

let isConnected = false

const connectDb = async () => {

    if (isConnected) {
        console.log("Database allready connected!")
        return
    }

    try {
        const connectionInstance = await mongoose.connect(DATABASE_URI)
        isConnected = true
        console.log(`Database conneted successfully to: ${connectionInstance.connection.host}`)

        mongoose.connection.on('disconnected', () => {
            console.log("Mongodb disconnected, Attempting to connect...")
        })

        mongoose.connection.on('error', (error) => {
            console.log("Mongodb connection error: ", error)
        })
    } catch (error) {
        console.log("Failed to connect mongodb", error)
        isConnected = false
        throw new error(`Database connection error: ${error.message}`)
    }
}

export default connectDb