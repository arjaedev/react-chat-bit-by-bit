require("dotenv").config()
const express = require("express")
const app = express()
const {connectDB} = require("./connectDB/db")
const PORT = process.env.PORT

const authRoutes = require("./controllers/auth")
const bitRoutes = require("./app/bit-by-bit")
const sessionValidation = require("./middleware/session")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(authRoutes)
app.use(sessionValidation, bitRoutes)



app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port ${PORT}`)
});