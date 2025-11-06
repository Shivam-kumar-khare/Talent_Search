import { StreamChat } from "stream-chat";

import { ENV } from "./env.js";

const apikey=ENV.STREAM_API_KEY;
const apiSecret=ENV.STREAM_API_SECRET;

if(!(apiSecret&&apikey)){console.error("STREAM API KEY OR STREAM API SECRET NOT FOUND")};

export const chatClient=StreamChat.getInstance(apikey,apiSecret);


const upsertStreamUser=async (userData)=>{
    try {
        await chatClient.upsertUser(userData);
        console.log("Upsert user successful",userData);
    } catch (error) {
        console.error("Error upserting Users");
    }
}

const deleteStreamUser=async (id)=>{
    try {
        await chatClient.deleteUser(id)
        console.log("User Deleted Succcessfully:",id)
    } catch (error) {
        console.error("Error deleting stream user:",error);
    }
}

export {
    deleteStreamUser,
    upsertStreamUser,
}