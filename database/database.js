const dotenv = require('dotenv');
const mongoose = require('mongoose');
const config = require('../config/config');

dotenv.config();
const mongodbUrl = config.MONGODB_URL

const connectDB = async () => {
    try {
        await mongoose.connect(mongodbUrl, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB database connection established successfully")
    } catch (err) {
        console.log(err);
    }
};

module.exports = connectDB;  