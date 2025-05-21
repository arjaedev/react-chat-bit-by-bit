const { mongoose } = require("../config/db")

const Message = new mongoose.Schema(
    {
        when: {
            type: Date,
            default: Date.now,
        },
        user: {
            type: Array,
            max: 50,
            required: true,
        },
        room: {
            type: String,
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

module.exports = mongoose.model("message", Message)