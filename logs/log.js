const { mongoose }  = require("../db")

const Log = new mongoose.Schema(
    {
        errorName: {
            type: String
        },
        errorMessage: {
            type: String
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("log", Log)