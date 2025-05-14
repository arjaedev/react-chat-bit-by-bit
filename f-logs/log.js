const { mongoose }  = require("../connectDB/db");

const checkError = new mongoose.Schema(
    {
        Name: {
            type: String
        },
        Message: {
            type: String
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("newError", checkError)