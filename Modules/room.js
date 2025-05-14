const { mongoose }  = require("../connectDB/db")

const room = new mongoose.Schema(
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
            type: String,
            required: true,
        }
    }

)


module.exports = mongoose.model("room", room)