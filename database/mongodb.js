import mongoose from 'mongoose';
import dns from "node:dns";
import {DB_URI, NODE_ENV} from '../config/env.js';

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectToDatabase = async () => {
    if (!DB_URI) {
        console.warn('No database URI configured. Skipping database connection.');
        return;
    }

    try {
        await mongoose.connect(DB_URI, { serverSelectionTimeoutMS: 5000 });
        console.log(`Connected to MongoDB database in ${NODE_ENV || 'development'} mode`);
    } catch (error) {
        console.error('Error connecting to the database:', error.message || error);
    }
};

export default connectToDatabase;
