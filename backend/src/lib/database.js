import mongoose from "mongoose"

import { ENV } from "./env.js"

export const connectDb = async () => {
    try {
        const conn = await mongoose.connect(ENV.DB_URL);
        console.log("Connected to Database :: ", conn.connection.host);
    } catch (e) {
        console.log("Error Connecting to DB::",e);
        process.exit(1);
    }
}