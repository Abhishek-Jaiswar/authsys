import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRoutes from '../routes/user.route.js'
import { config } from 'dotenv'
config()

const server = express()

// middlewares
server.use(cors({
    origin: process.env.CLIENT_URI,
    credentials: true
}))

server.use(express.json())

server.use(cookieParser())

// Endpoints

server.use('/api/v1/user', userRoutes)

server.get('/', (req, res) => {
    return res.json({
        message: "Welcome to the authysys, it is working fine till now!"
    })
})

export default server