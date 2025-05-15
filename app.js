require("dotenv").config()
const express = require("express")
const app = express()
const {connectDB} = require("./config/db")
const PORT = process.env.PORT || 3000

const authRoutes = require("./controllers/auth")
const bitRoutes = require("./controllers/bit-by-bit")
const sessionValidation = require("./middleware/session")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(authRoutes)
app.use(sessionValidation, bitRoutes)



app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port ${PORT}`)
});