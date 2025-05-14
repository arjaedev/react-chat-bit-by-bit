const { mongoose }  = require("../services,logError");

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