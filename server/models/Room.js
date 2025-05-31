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
    
        },
        addedUsers: {
            type: Array,
            required: true,
        }
    }

)


module.exports = mongoose.model("room", Room)

