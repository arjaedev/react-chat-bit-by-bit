const User = new mongoose.Schema(
    {
        firstName: {
            // Validators
            type: String,
            required: true,
            max: 100,
        },
        lastName: {
            type: String,
            required: true,
            max: 100,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("user", User)