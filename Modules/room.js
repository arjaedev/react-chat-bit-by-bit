const room = new mongoose.Schema(
    {
        name: {
            // Validators
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