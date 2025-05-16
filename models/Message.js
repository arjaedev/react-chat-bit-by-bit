const { mongoose }  = require("../config/db")

const message = new mongoose.Schema(
    {
        when: {
            type: Date,
            default: Date.now,
        },
        user: {
            type: Array,   // ! Not supposed to be a string?
            max: 50,
            required: true,
        },
        room: {
            type: String,   // ! Not supposed to be a string?
            max: 50,
        },
        body: {
            type: String,
            max: 500,
            required: true,
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("message", message)