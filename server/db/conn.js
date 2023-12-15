const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.ATLAS_URI);
        console.log(`Database connected: ${con.connection.host}`);
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
    }
};

module.exports = connectDB;
