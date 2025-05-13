const message = new mongoose.Schema(
    {
        when: {
            type: String,
            max: 50,
        },
        user: {
            type: String,
            max: 50,
        },
        room: {
            type: String,
            max: 50,
        },
        body: {
            type: String,
            max: 100,
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("message", message)