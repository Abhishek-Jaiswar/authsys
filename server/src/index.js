import server from "./app.js";
import connectDb from "../config/db.js";
import { config } from 'dotenv'
import { logger } from "../libs/logger.js";
config(
    { path: "./env" }
)

const PORT = process.env.PORT || 8000

const startServer = async () => {
    try {
        await connectDb()
        logger.info('MongoDB connected successfully');

        server.listen(PORT, async () => {
            logger.info(`Server is listening on port: http://localhost:${PORT}`)
        })

        server.on('error', (error) => {
            logger.error("Server error: ", error)
            process.exit(1)
        })
    } catch (error) {
        logger.error("Failed to start server due to internal issue: ", error)
        process.exit()
    }
}

startServer()


