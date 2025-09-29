import server from "./app.js";
import connectDb from "../config/db.js";
import { config } from 'dotenv'
config(
    { path: "./env" }
)

const PORT = process.env.PORT || 8000

const startServer = async () => {
    try {
        await connectDb()
        console.log('MongoDB connected successfully');

        server.listen(PORT, async () => {
            console.log(`Server is listening on port: http://localhost:${PORT}`)
        })

        server.on('error', (error) => {
            console.log("Server error: ", error)
            process.exit(1)
        })
    } catch (error) {
       console.log("Failed to start server due to internal issue: ", error)
        process.exit()
    }
}

startServer()


