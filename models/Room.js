const { mongoose } = require("../config/db")

const Room = new mongoose.Schema(
    {
        roomName: {
            type: String,
            required: true,
            max: 100,
        },
        description: {
            type: String,
            required: true,
            unique: true,
        },
        addedUsers: {
            type: Array,   // ! Type should bean Array
            required: true,
        }
    }

)


module.exports = mongoose.model("room", Room)