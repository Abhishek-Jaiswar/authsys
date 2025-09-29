import mongoose from 'mongoose'
import { logger } from '../libs/logger.js'
import { config } from 'dotenv'
config()

const DATABASE_URI = process.env.MONGODB_URI

if (!DATABASE_URI) {
    throw new Error("MONGODB_URI environment variable is not defined!")
}

let isConnected = false

const connectDb = async () => {

    if (isConnected) {
        logger.info("Database allready connected!")
        return
    }

    try {
        const connectionInstance = await mongoose.connect(DATABASE_URI)
        isConnected = true
        logger.info(`Database conneted successfully to: ${connectionInstance.connection.host}`)

        mongoose.connection.on('disconnected', () => {
            logger.warn("Mongodb disconnected, Attempting to connect...")
            // Todo: reconnection logic
        })

        mongoose.connection.on('error', (error) => {
            logger.error("Mongodb connection error: ", error)
        })
    } catch (error) {
        logger.error("Failed to connect mongodb", error)
        isConnected = false
        throw new error(`Database connection error: ${error.message}`)
    }
}

export default connectDb