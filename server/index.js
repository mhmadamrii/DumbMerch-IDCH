require('dotenv').config()
const express = require('express')
const router = require('./src/routes')
const app = express()
const port = 5000;
const cors = require('cors');

// socket.io configuration
const http = require('http')
const { Server } = require('socket.io')
const server = http.createServer(app)
const io = new Server(server, {
    // client origin
    cors: {
        origin: 'http://localhost:3000' 
    }
})

require('./src/socket')(io)


app.use(express.json())
app.use(cors());
app.use('/api/v1/', router)
app.use('/uploads', express.static('uploads'))

server.listen(port, () => {
    console.log(`server listening on port ${port}`)
});
