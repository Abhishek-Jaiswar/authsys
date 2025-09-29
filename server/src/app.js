import express from 'express'

const server = express()




server.get('/', (req, res) => {
    return res.json({
        message: "Welcome to the authysys, it is working fine till now!"
    })
})

export default server