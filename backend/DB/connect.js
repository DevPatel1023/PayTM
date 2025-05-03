const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error while connecting to MongoDB:', err);
        process.exit(1);
    }
}

module.exports = connectDB;
