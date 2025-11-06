import mongoose from "mongoose"

import { ENV } from "./env.js"

export const connectDb = async () => {
    try {
        if (mongoose.connection.readyState >= 1) return;
        if (!ENV.DB_URL) throw new Error("DB_url is not defined in enviroment variable");
        const conn = await mongoose.connect(ENV.DB_URL);
        console.log("Connected to Database :: ", conn.connection.host);
    } catch (e) {
        console.log("Error Connecting to DB::", e);
        process.exit(1);
    }
}