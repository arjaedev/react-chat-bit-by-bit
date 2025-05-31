require("dotenv").config()
const express = require("express")
const app = express()
const router = express.Router()
const {connectDB} = require("./config/db")
const PORT = process.env.PORT || 3000

const authRoutes = require("./controller/auth")
const roomRoutes = require("./controller/Rooms")
const messageRoutes = require("./controller/message")
const sessionValidation = require("./middleware/session")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/auth',sessionValidation, authRoutes)
app.use('/rooms', sessionValidation, roomRoutes)
app.use('/messages', sessionValidation, messageRoutes)


app.use(router)


app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port ${PORT}`)
});

