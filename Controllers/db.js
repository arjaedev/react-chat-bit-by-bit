const mongoose = require('mongoose');

const dbURI = process.env.DB_URL

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", true);
        await mongoose.connect(dbURI)
        console.log('React Chat Project: ${dbURI} connected');
    }
    catch (error) {
        console.log('Error connecting to React Chat Project:');
    }
}
module.exports = { connectDB, mongoose }