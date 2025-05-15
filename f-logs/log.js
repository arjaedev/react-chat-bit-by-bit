const { mongoose }  = require("../config/db");

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